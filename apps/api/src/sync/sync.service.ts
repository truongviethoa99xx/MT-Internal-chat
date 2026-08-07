import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toWireMessage, toWireConversation } from '../common/wire';
import type { SyncRequest, SyncResponse } from '@mtm/shared';

const PAGE_LIMIT = 500; // cap mỗi hội thoại mỗi lần sync; hụt hơn -> đánh dấu truncated

@Injectable()
export class SyncService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Read path — lưới an toàn cuối. Client gửi cursor (last_seq/hội thoại từ IndexedDB),
   * server trả mọi tin seq > cursor + thay đổi membership. Socket rớt bao lâu cũng không mất.
   */
  async sync(userId: string, req: SyncRequest): Promise<SyncResponse> {
    const memberships = await this.prisma.conversationMember.findMany({
      where: { userId },
      include: { conversation: true },
    });

    const messages: SyncResponse['messages'] = {};
    const conversations: SyncResponse['conversations'] = [];
    const removed: string[] = [];
    const truncated: string[] = [];

    for (const m of memberships) {
      const convId = m.conversationId;
      const cursor = BigInt(req.cursors[convId] ?? 0);

      // Bị gỡ: vẫn trả tin tới removedAtSeq (gồm system message "bị gỡ"), rồi báo removed.
      const upper = m.status === 'removed' ? (m.removedAtSeq ?? m.conversation.lastSeq) : null;

      const rows = await this.prisma.message.findMany({
        where: {
          conversationId: convId,
          seq: upper ? { gt: cursor, lte: upper } : { gt: cursor },
        },
        orderBy: { seq: 'asc' },
        take: PAGE_LIMIT + 1,
      });

      if (rows.length > PAGE_LIMIT) {
        rows.pop();
        truncated.push(convId);
      }
      if (rows.length) messages[convId] = rows.map(toWireMessage);

      if (m.status === 'removed') {
        removed.push(convId);
        continue;
      }

      const memberCount = await this.prisma.conversationMember.count({
        where: { conversationId: convId, status: 'active' },
      });
      conversations.push(toWireConversation(m.conversation, m, memberCount));
    }

    return {
      messages,
      conversations,
      removed,
      truncated: truncated.length ? truncated : undefined,
      serverTime: new Date().toISOString(),
    };
  }

  // "đã nhận" / "đã xem" = cập nhật 1 con số (không phải bảng reads từng dòng).
  async ack(userId: string, conversationId: string, seq: number, kind: 'delivered' | 'read') {
    const field = kind === 'read' ? 'lastReadSeq' : 'lastDeliveredSeq';
    await this.prisma.conversationMember.updateMany({
      // chỉ tiến lên, không lùi (tránh ack cũ ghi đè)
      where: { conversationId, userId, [field]: { lt: BigInt(seq) } },
      data: { [field]: BigInt(seq) },
    });
  }
}
