# MTM Chat — Chat nội bộ Minh Tuấn Mobile

Chat nội bộ đồng bộ 1Office. **Ưu tiên: gửi nhanh, đúng thứ tự, không miss tin.**

Nguyên tắc: **DB là nguồn chân lý, WebSocket chỉ là kênh báo nhanh.** Không bao giờ
tin socket đã giao thành công — mọi client tự "kéo bù" phần thiếu qua `/sync`.

## Stack

| | |
|---|---|
| Monorepo | pnpm workspace + TypeScript |
| Backend | NestJS · Prisma · PostgreSQL · Socket.IO · (Redis + FCM sẽ thêm) |
| Frontend | React + Vite · Dexie (IndexedDB) · socket.io-client |
| Contract | `@mtm/shared` — wire-types dùng chung FE/BE, không bao giờ lệch |

```
apps/
  api/   NestJS  — REST (/messages, /sync, /ack) + Socket.IO gateway
  web/   React   — local-first (IndexedDB), outbox, gap-detect, sync
packages/
  shared/        — protocol.ts, socket-events.ts (wire-contract)
```

## Ba cơ chế chống miss tin

1. **Sequence + gap detection** — mỗi tin có `seq` tăng đều GAPLESS theo hội thoại.
   Cấp trong transaction bằng `Conversation.lastSeq` (KHÔNG dùng Redis INCR — tránh
   burned seq / reorder gap). Xem `apps/api/src/messages/messages.service.ts`.
2. **/sync khi reconnect** — client gửi `{conversationId: last_seq}`, server trả mọi
   tin `seq` lớn hơn + thay đổi membership. Xem `apps/api/src/sync/sync.service.ts`.
3. **Idempotency** — `client_msg_id` (UUID) unique; retry trả đúng tin cũ, không double.

Client: tin ghi vào IndexedDB trước khi render; sort theo `seq`; outbox bền vững
retry backoff; gap-detect trong socket handler → tự `/sync`.

## Invariant

Với mỗi conversation: `seq` liên tục, không lỗ, mỗi `seq` resolve về một event
(message hoặc tombstone). Thu hồi tin = tombstone tại đúng `seq`, KHÔNG hard-delete.

## Chạy (local)

> Cần Node ≥ 20, pnpm, PostgreSQL.

```bash
pnpm install

# API
cp apps/api/.env.example apps/api/.env      # sửa DATABASE_URL
pnpm --filter @mtm/api prisma migrate dev    # tạo schema
pnpm --filter @mtm/api dev                    # http://localhost:3000

# Web
pnpm --filter @mtm/web dev                    # http://localhost:5173
```

Dev auth tạm: header `x-user-id` (REST) và `auth.userId` (socket). **TODO: 1Office SSO + JWT.**

## Còn lại (theo thứ tự ưu tiên)

- [ ] Seed dữ liệu + `GET /conversations/:id/messages` (lịch sử cũ, phân trang)
- [ ] Đồng bộ 1Office → membership nhóm phòng ban + system message khi gỡ nhân sự
- [ ] FCM push (BullMQ queue riêng) + Redis adapter cho Socket.IO scale
- [ ] Auth 1Office (OAuth + JWT), thay dev guard
- [ ] UI đầy đủ theo mockup (3 cột, đăng nhập, panel chi tiết nhóm)
- [ ] Reaction / read-receipt (eventually-consistent, tính khi fetch)
