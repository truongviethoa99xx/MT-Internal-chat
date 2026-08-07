import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { IsIn, IsInt, IsObject, IsUUID, Min } from 'class-validator';
import { DevUserGuard } from '../auth/dev-user.guard';
import { SyncService } from './sync.service';
import type { AckRequest, SyncRequest, SyncResponse } from '@mtm/shared';

class SyncDto implements SyncRequest {
  @IsObject()
  cursors!: Record<string, number>;
}

class AckDto implements AckRequest {
  @IsUUID()
  conversationId!: string;

  @IsInt()
  @Min(0)
  seq!: number;

  @IsIn(['delivered', 'read'])
  kind!: 'delivered' | 'read';
}

@UseGuards(DevUserGuard)
@Controller()
export class SyncController {
  constructor(private readonly sync: SyncService) {}

  @Post('sync')
  async doSync(@Req() req: any, @Body() dto: SyncDto): Promise<SyncResponse> {
    return this.sync.sync(req.userId, dto);
  }

  @Post('ack')
  async doAck(@Req() req: any, @Body() dto: AckDto): Promise<{ ok: true }> {
    await this.sync.ack(req.userId, dto.conversationId, dto.seq, dto.kind);
    return { ok: true };
  }
}
