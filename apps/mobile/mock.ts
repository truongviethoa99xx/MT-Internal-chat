// Dữ liệu giả cho layout mobile.
export type AvaKind = 'grp' | 'grey' | 'tint';

export interface Conv {
  id: string;
  name: string;
  avatar: string;
  avaKind: AvaKind;
  round?: boolean;
  presence?: boolean;
  preview?: string;
  unread?: number;
  archived?: boolean;
  type?: 'department' | 'project' | 'common' | 'direct';
  memberCount?: number;
}

export const conversations: Conv[] = [
  { id: 'kinh-doanh', name: 'Phòng Kinh doanh', avatar: 'KD', avaKind: 'grp', preview: 'Huy: Đã gửi báo cáo tuần', unread: 5, type: 'department', memberCount: 24 },
  { id: 'kho-van', name: 'Phòng Kho vận', avatar: 'KV', avaKind: 'grey', preview: 'Đã lưu trữ · chỉ xem', archived: true, type: 'department' },
  { id: 'tran-thi-binh', name: 'Trần Thị Bình', avatar: 'TB', avaKind: 'tint', round: true, presence: true, preview: 'Anh ơi báo cáo em gửi rồi', unread: 2, type: 'direct' },
  { id: 'app-q3', name: 'Dự án Ra mắt App Q3', avatar: 'DA', avaKind: 'grey', preview: 'Bình: Đã cập nhật timeline', unread: 3, type: 'project', memberCount: 8 },
  { id: 'bong-da', name: 'CLB Bóng đá công ty', avatar: 'CLB', avaKind: 'grey', preview: 'Lan: 6h tối nay đá nhé', unread: 1, type: 'common', memberCount: 30 },
];

export interface Msg {
  kind: 'sys' | 'in' | 'out';
  sender?: string;
  avatar?: string;
  text: string;
  time?: string;
}

const kinhDoanh: Msg[] = [
  { kind: 'sys', text: 'Huy đã tham gia nhóm' },
  { kind: 'in', sender: 'Trần Thị Bình', avatar: 'TB', text: 'Chào mọi người, đạt target rồi 🎉' },
  { kind: 'out', text: 'Tốt lắm! @all chú ý deadline báo cáo cuối tuần', time: '08:15' },
  { kind: 'in', sender: 'Vũ Quang Huy', avatar: 'VH', text: 'Dạ em nhớ rồi anh' },
];

const binh: Msg[] = [
  { kind: 'in', sender: 'Trần Thị Bình', avatar: 'TB', text: 'Anh ơi báo cáo em gửi rồi ạ' },
  { kind: 'out', text: 'Ủa em, anh xem liền nhé', time: '10:03' },
];

const threads: Record<string, Msg[]> = { 'kinh-doanh': kinhDoanh, 'tran-thi-binh': binh };

export function threadFor(id: string): Msg[] {
  return threads[id] ?? kinhDoanh;
}

export function avaBg(kind: AvaKind): string {
  if (kind === 'grp') return '#4F46E5';
  if (kind === 'tint') return '#E0E7FF';
  return '#F3F4F6';
}
export function avaFg(kind: AvaKind): string {
  if (kind === 'grp') return '#FFFFFF';
  if (kind === 'tint') return '#4338CA';
  return '#4B5563';
}
