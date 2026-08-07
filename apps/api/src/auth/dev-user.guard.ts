import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

// TODO(auth): thay bằng 1Office SSO (OAuth) + JWT. Guard này chỉ để dev:
// đọc userId từ header `x-user-id`. Gateway cũng verify tương tự ở handshake.
@Injectable()
export class DevUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userId = req.headers['x-user-id'];
    if (!userId || typeof userId !== 'string') {
      throw new UnauthorizedException('Missing x-user-id (dev auth)');
    }
    req.userId = userId;
    return true;
  }
}
