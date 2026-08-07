import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ChatModule } from '../chat/chat.module';
import { PushModule } from '../push/push.module';

@Module({
  imports: [ChatModule, PushModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
