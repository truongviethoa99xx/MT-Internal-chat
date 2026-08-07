import { Injectable, Logger } from '@nestjs/common';
import type { Message } from '@mtm/shared';

// Đẩy FCM cho ai đang offline. Payload là DATA message (conv_id + seq) để app tự
// kéo đúng tin rồi render notification cục bộ.
//
// TODO(push): chuyển sang hàng đợi RIÊNG (BullMQ queue "push", Redis-backed) —
// tách khỏi queue sync 1Office để đồng bộ nhân sự chậm không làm chậm thông báo tin.
// Lưu ý: iOS silent push là best-effort; killed-app có thể cần alert notification.
@Injectable()
export class PushService {
  private readonly log = new Logger(PushService.name);

  async enqueueNewMessage(message: Message): Promise<void> {
    // Stub: chỗ này add job vào queue:push. Tạm log để thấy luồng.
    this.log.debug(
      `push queued conv=${message.conversationId} seq=${message.seq} id=${message.id}`,
    );
  }
}
