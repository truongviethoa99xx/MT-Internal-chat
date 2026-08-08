// Dữ liệu giả cho layout — chưa nối API.
export type AvaKind = 'grp' | 'grey' | 'tint';

export interface Conv {
  id: string;
  name: string;
  section: string;
  avatar: string;
  avaKind: AvaKind;
  round?: boolean;
  presence?: boolean;
  time?: string;
  preview?: string;
  unread?: number;
  archived?: boolean;
  type?: 'department' | 'project' | 'common' | 'direct';
  memberCount?: number;
}

export const SECTIONS = ['Ghim', 'Nhóm phòng ban', 'Nhóm chung', 'Tin nhắn riêng'];

export const conversations: Conv[] = [
  { id: 'app-q3', name: 'Dự án Ra mắt App Q3', section: 'Ghim', avatar: 'DA', avaKind: 'grey', time: '09:41', preview: 'Bình: Đã cập nhật timeline', unread: 3, type: 'project', memberCount: 8 },
  { id: 'kinh-doanh', name: 'Phòng Kinh doanh', section: 'Nhóm phòng ban', avatar: 'KD', avaKind: 'grp', time: '08:15', preview: 'Huy: Đã gửi báo cáo tuần', unread: 5, type: 'department', memberCount: 24 },
  { id: 'marketing', name: 'Phòng Marketing', section: 'Nhóm phòng ban', avatar: 'MK', avaKind: 'tint', time: '07:50', preview: 'Châu: Mẫu banner mới nè', type: 'department', memberCount: 12 },
  { id: 'kho-van', name: 'Phòng Kho vận', section: 'Nhóm phòng ban', avatar: 'KV', avaKind: 'grey', preview: 'Nhóm đã lưu trữ · chỉ xem', archived: true, type: 'department' },
  { id: 'bong-da', name: 'CLB Bóng đá công ty', section: 'Nhóm chung', avatar: 'CLB', avaKind: 'grey', time: '11:20', preview: 'Lan: 6h tối nay đá nhé', unread: 1, type: 'common', memberCount: 30 },
  { id: 'tran-thi-binh', name: 'Trần Thị Bình', section: 'Tin nhắn riêng', avatar: 'TB', avaKind: 'tint', round: true, presence: true, time: '10:02', preview: 'Anh ơi báo cáo em gửi rồi', unread: 2, type: 'direct' },
  { id: 'pham-duc-duy', name: 'Phạm Đức Duy', section: 'Tin nhắn riêng', avatar: 'PD', avaKind: 'tint', round: true, time: 'Hôm qua', preview: 'Ok anh', type: 'direct' },
];

export interface Msg {
  kind: 'sys' | 'in' | 'out';
  sender?: string;
  avatar?: string;
  text: string;
  time?: string;
}

const kinhDoanh: Msg[] = [
  { kind: 'sys', text: 'Vũ Quang Huy đã tham gia nhóm' },
  { kind: 'in', sender: 'Trần Thị Bình', avatar: 'TB', text: 'Chào mọi người, tuần này mình đạt target rồi 🎉' },
  { kind: 'in', sender: 'Trần Thị Bình', avatar: 'TB', text: 'Cả nhóm cùng cố gắng nốt tháng này nha' },
  { kind: 'out', text: 'Tốt lắm Bình! @all mọi người chú ý deadline báo cáo cuối tuần', time: '08:15' },
  { kind: 'in', sender: 'Vũ Quang Huy', avatar: 'VH', text: 'Dạ em nhớ rồi anh' },
  { kind: 'sys', text: 'Đặng Văn Sơn đã rời khỏi tổ chức' },
];

const binh: Msg[] = [
  { kind: 'in', sender: 'Trần Thị Bình', avatar: 'TB', text: 'Anh ơi báo cáo em gửi rồi ạ' },
  { kind: 'out', text: 'Ủa em, anh xem liền nhé', time: '10:03' },
];

const threads: Record<string, Msg[]> = {
  'kinh-doanh': kinhDoanh,
  'tran-thi-binh': binh,
};

export function threadFor(id: string): Msg[] {
  return threads[id] ?? kinhDoanh;
}
