import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { DevUserGuard } from '../auth/dev-user.guard';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';
import type { SendMessageResponse } from '@mtm/shared';

@UseGuards(DevUserGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  // Gửi tin qua REST (không qua socket): có status code rõ ràng, retry được.
  @Post()
  async send(@Req() req: any, @Body() dto: SendMessageDto): Promise<SendMessageResponse> {
    const message = await this.messages.send(req.userId, dto);
    return { message };
  }
}
