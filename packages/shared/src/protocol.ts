// ---------------------------------------------------------------------------
// Wire-contract dùng chung cho FE (React) và BE (NestJS).
// Nguyên tắc: đổi type ở đây là CẢ HAI đầu cùng đổi — contract không bao giờ lệch.
// seq là số nguyên tăng đều theo từng conversation, GAPLESS, mỗi seq luôn resolve
// về một event (message hoặc tombstone). Đây là hợp đồng khiến gap-detection đúng.
// ---------------------------------------------------------------------------

export type ConversationType =
  | 'department' // nhóm phòng ban — membership đồng bộ tự động từ 1Office
  | 'project'    // nhóm dự án — admin quản lý tay
  | 'common'     // nhóm chung — admin quản lý tay
  | 'direct'     // tin nhắn 1-1
  | 'archived';  // đã lưu trữ — chỉ xem

export type MemberStatus = 'active' | 'removed'; // removed = soft-remove (tombstone)
export type MemberRole = 'owner' | 'admin' | 'member';
export type MessageType = 'text' | 'image' | 'file' | 'voice' | 'system';

// Trạng thái phía UI. Server chỉ lưu read/delivered (dạng con số last_*_seq);
// pending/sent/failed do client tự suy ra.
export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string | null;   // null = tin hệ thống
  clientMsgId: string;       // UUID sinh ở client, unique — chống trùng khi retry
  seq: number;               // gapless per conversation
  type: MessageType;
  content: string;
  replyToId: string | null;
  createdAt: string;         // ISO, server gán
  editedAt: string | null;
  deletedAt: string | null;  // != null => tombstone (thu hồi)
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string | null;
  avatarColor: string | null;
  lastSeq: number;           // seq lớn nhất hiện có
  myLastReadSeq: number;     // để tính badge chưa đọc
  memberCount: number;
  updatedAt: string;
}

// ---- POST /messages ----
export interface SendMessageRequest {
  conversationId: string;
  clientMsgId: string;       // sinh TRƯỚC khi gửi, giữ nguyên khi retry
  type: MessageType;
  content: string;
  replyToId?: string | null;
}
export interface SendMessageResponse {
  message: Message;
}

// ---- POST /sync ---- (kéo bù phần MỚI; KHÁC lịch sử cũ)
export interface SyncRequest {
  cursors: Record<string, number>; // conversationId -> last_seq client đang giữ (từ IndexedDB)
}
export interface SyncResponse {
  messages: Record<string, Message[]>; // tin có seq > cursor, theo hội thoại, đã sort tăng
  conversations: Conversation[];       // hội thoại mới / thay đổi membership
  removed: string[];                   // hội thoại mình đã bị gỡ (kèm system message cuối)
  serverTime: string;
  truncated?: string[];                // hội thoại bị cắt bớt (offline quá lâu) -> cần phân trang
}

// ---- POST /ack ----
export interface AckRequest {
  conversationId: string;
  seq: number;
  kind: 'delivered' | 'read';
}

// ---- GET /conversations/:id/messages?beforeSeq=&limit= ---- (cuộn lên xem lịch sử cũ)
export interface HistoryResponse {
  messages: Message[];
  oldestSeq: number; // để client biết đã tới đầu hội thoại chưa
}
