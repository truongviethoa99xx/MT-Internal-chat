import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { PushModule } from './push/push.module';
import { MessagesModule } from './messages/messages.module';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ChatModule,
    PushModule,
    MessagesModule,
    SyncModule,
  ],
})
export class AppModule {}
