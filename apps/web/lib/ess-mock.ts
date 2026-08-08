// Dữ liệu giả cho portal nhân viên (ESS).
export const me = { ten: 'Trần Thị Bình', ma: 'NV0034', donVi: 'MTM Quận 5', chucVu: 'NVBH' };

export const caHomNay = { ca: 'CA1', gio: '08:00–16:00', diaDiem: 'MTM Quận 5', trangThai: 'Chưa chấm vào' };

export interface CaNgay { ngay: string; ca: string; gio: string; diaDiem?: string; }
export const caTuan: CaNgay[] = [
  { ngay: 'T2 25/08', ca: 'CA1', gio: '08:00–16:00', diaDiem: 'MTM Quận 5' },
  { ngay: 'T3 26/08', ca: 'CA1', gio: '08:00–16:00', diaDiem: 'MTM Quận 5' },
  { ngay: 'T4 27/08', ca: 'OFF', gio: '—' },
  { ngay: 'T5 28/08', ca: 'CA2', gio: '14:00–22:00', diaDiem: 'MTM Quận 5' },
  { ngay: 'T6 29/08', ca: 'CA2', gio: '14:00–22:00', diaDiem: 'MTM Quận 5' },
  { ngay: 'T7 30/08', ca: 'CA1', gio: '08:00–16:00', diaDiem: 'MTM Thủ Đức' },
  { ngay: 'CN 31/08', ca: 'OFF', gio: '—' },
];

export interface ChamRow { ngay: string; ca: string; vao: string; ra: string; trangThai: 'du_cong' | 'tre' | 'thieu_cham' | 'vang'; }
export const chamCongGanDay: ChamRow[] = [
  { ngay: '24/08', ca: 'CA2', vao: '13:58', ra: '22:03', trangThai: 'du_cong' },
  { ngay: '23/08', ca: 'CA1', vao: '08:07', ra: '16:00', trangThai: 'tre' },
  { ngay: '22/08', ca: 'CA1', vao: '07:59', ra: '16:01', trangThai: 'du_cong' },
  { ngay: '21/08', ca: 'CA2', vao: '14:00', ra: '', trangThai: 'thieu_cham' },
];

export interface DonRow { loai: string; ngay: string; trangThai: 'cho' | 'duyet' | 'tu_choi'; chiTiet: string; }
export const donCuaToi: DonRow[] = [
  { loai: 'Nghỉ phép năm', ngay: '28/08', trangThai: 'cho', chiTiet: '1 ngày' },
  { loai: 'Đổi ca', ngay: '20/08', trangThai: 'duyet', chiTiet: 'Nhờ Huy làm thay CA2' },
  { loai: 'Giải trình quên chấm', ngay: '18/08', trangThai: 'tu_choi', chiTiet: 'Quên chấm ra CA1' },
];

export const quyPhep = { capPhat: 12, daDung: 7, conLai: 5 };
export const congThang = { chuan: 26, thucTe: 18 };

export const phieuLuong = [
  { ky: '07/2026', thucNhan: '9.540.000' },
  { ky: '06/2026', thucNhan: '9.210.000' },
  { ky: '05/2026', thucNhan: '9.880.000' },
];
