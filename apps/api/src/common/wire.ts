import type { Message as PrismaMessage, Conversation as PrismaConversation, ConversationMember } from '@prisma/client';
import type { Message, Conversation } from '@mtm/shared';

// BigInt seq an toàn trong khoảng Number (per-conversation seq thực tế << 2^53).
const n = (v: bigint) => Number(v);

export function toWireMessage(m: PrismaMessage): Message {
  return {
    id: m.id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    clientMsgId: m.clientMsgId,
    seq: n(m.seq),
    type: m.type,
    content: m.content,
    replyToId: m.replyToId,
    createdAt: m.createdAt.toISOString(),
    editedAt: m.editedAt ? m.editedAt.toISOString() : null,
    deletedAt: m.deletedAt ? m.deletedAt.toISOString() : null,
  };
}

export function toWireConversation(
  c: PrismaConversation,
  member: Pick<ConversationMember, 'lastReadSeq'>,
  memberCount: number,
): Conversation {
  return {
    id: c.id,
    type: c.type,
    name: c.name,
    avatarColor: c.avatarColor,
    lastSeq: n(c.lastSeq),
    myLastReadSeq: n(member.lastReadSeq),
    memberCount,
    updatedAt: c.updatedAt.toISOString(),
  };
}
