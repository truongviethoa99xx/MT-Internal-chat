import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatGateway } from '../chat/chat.gateway';
import { PushService } from '../push/push.service';
import { toWireMessage } from '../common/wire';
import type { Message, SendMessageRequest } from '@mtm/shared';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: ChatGateway,
    private readonly push: PushService,
  ) {}

  /**
   * Write path. Persist TRƯỚC, broadcast SAU (afterCommit).
   * seq cấp TRONG transaction bằng counter Conversation.lastSeq — không dùng Redis INCR:
   *  - Khóa hàng conversation (FOR UPDATE) serialize mọi tin cùng hội thoại -> không reorder gap.
   *  - Idempotency check nằm trong khóa -> không đua (TOCTOU).
   *  - Rollback hoàn lại luôn increment -> KHÔNG bao giờ đốt seq (không tạo gap ma).
   */
  async send(userId: string, dto: SendMessageRequest): Promise<Message> {
    const { row, created } = await this.prisma.$transaction(async (tx) => {
      // 1) Khóa hàng conversation -> serialize
      await tx.$queryRaw`SELECT id FROM "Conversation" WHERE id = ${dto.conversationId} FOR UPDATE`;

      // 2) Quyền: phải là thành viên active
      const member = await tx.conversationMember.findUnique({
        where: { conversationId_userId: { conversationId: dto.conversationId, userId } },
        select: { status: true },
      });
      if (!member || member.status !== 'active') {
        throw new ForbiddenException('Not an active member of this conversation');
      }

      // 3) Idempotency: đã có client_msg_id -> trả tin cũ, KHÔNG cấp seq mới
      const existing = await tx.message.findUnique({
        where: {
          conversationId_clientMsgId: {
            conversationId: dto.conversationId,
            clientMsgId: dto.clientMsgId,
          },
        },
      });
      if (existing) return { row: existing, created: false };

      // 4) Cấp seq trong transaction
      const conv = await tx.conversation.update({
        where: { id: dto.conversationId },
        data: { lastSeq: { increment: 1 } },
        select: { lastSeq: true },
      });

      // 5) INSERT
      const row = await tx.message.create({
        data: {
          conversationId: dto.conversationId,
          senderId: userId,
          clientMsgId: dto.clientMsgId,
          seq: conv.lastSeq,
          type: dto.type,
          content: dto.content,
          replyToId: dto.replyToId ?? null,
        },
      });
      return { row, created: true };
    });

    const message = toWireMessage(row);

    // 6) afterCommit — chỉ khi thực sự tạo mới (retry idempotent không phát lại)
    if (created) {
      this.gateway.emitMessageNew(message); // best-effort realtime
      await this.push.enqueueNewMessage(message); // queue riêng cho FCM
    }
    return message;
  }
}
