import type { Message, Conversation } from './protocol';

// Kênh Socket.IO CHỈ để nhận (notification plane). Gửi tin luôn qua REST.
// Server -> Client
export const SERVER_EVENTS = {
  MESSAGE_NEW: 'message.new',
  MESSAGE_UPDATED: 'message.updated',      // sửa / thu hồi (tombstone)
  MEMBERSHIP_CHANGED: 'membership.changed',
} as const;

export interface MessageNewPayload { message: Message; }
export interface MessageUpdatedPayload { message: Message; }
export interface MembershipChangedPayload { conversation: Conversation; removed?: boolean; }

// Client -> Server
export const CLIENT_EVENTS = {
  PRESENCE_PING: 'presence.ping',
} as const;

// Quy ước phòng (room)
export const convRoom = (conversationId: string) => `conv:${conversationId}`;
export const userRoom = (userId: string) => `user:${userId}`;
