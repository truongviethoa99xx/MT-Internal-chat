import { IsIn, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import type { MessageType, SendMessageRequest } from '@mtm/shared';

const TYPES: MessageType[] = ['text', 'image', 'file', 'voice', 'system'];

export class SendMessageDto implements SendMessageRequest {
  @IsUUID()
  conversationId!: string;

  // client_msg_id sinh ở client TRƯỚC khi gửi; giữ nguyên khi retry -> idempotent
  @IsUUID()
  clientMsgId!: string;

  @IsIn(TYPES)
  type!: MessageType;

  @IsString()
  @MinLength(1)
  @MaxLength(8000)
  content!: string;

  @IsOptional()
  @IsUUID()
  replyToId?: string | null;
}
