// Dữ liệu giả cho layout HRM — chưa nối API.
export const stats = [
  { label: 'Tổng nhân sự', value: '248', sub: 'Văn phòng 64 · Cửa hàng 184' },
  { label: 'Đi làm hôm nay', value: '221', sub: '89% · 12 nghỉ phép' },
  { label: 'Đơn chờ duyệt', value: '9', sub: '3 OT · 4 nghỉ · 2 đổi ca' },
  { label: 'Kỳ lương 08/2026', value: 'Đang mở', sub: 'Chốt công 03/09' },
];

export interface OrgNode { ten: string; loai: string; children?: OrgNode[]; }
export const orgTree: OrgNode = {
  ten: 'Minh Tuấn Mobile', loai: 'Công ty', children: [
    { ten: 'Khối văn phòng', loai: 'khoi', children: [
      { ten: 'Phòng Kinh doanh', loai: 'phong_ban', children: [{ ten: 'BP Online', loai: 'bo_phan' }, { ten: 'BP Sỉ/Đại lý', loai: 'bo_phan' }] },
      { ten: 'Phòng Kế toán', loai: 'phong_ban' },
      { ten: 'Phòng Marketing', loai: 'phong_ban' },
      { ten: 'Phòng CNTT', loai: 'phong_ban' },
    ] },
    { ten: 'Khối cửa hàng', loai: 'khoi', children: [
      { ten: 'MTM Quận 5', loai: 'cua_hang' },
      { ten: 'MTM Quận 10', loai: 'cua_hang' },
      { ten: 'MTM Thủ Đức', loai: 'cua_hang' },
    ] },
  ],
};

export interface Emp { id: string; ma: string; ten: string; donVi: string; chucVu: string; loaiLich: 'co_dinh' | 'xoay_ca'; trangThai: 'active' | 'thu_viec' | 'nghi'; }
export const employees: Emp[] = [
  { id: 'e1', ma: 'NV0012', ten: 'Nguyễn Văn An', donVi: 'Phòng Kinh doanh', chucVu: 'Trưởng phòng', loaiLich: 'co_dinh', trangThai: 'active' },
  { id: 'e2', ma: 'NV0034', ten: 'Trần Thị Bình', donVi: 'MTM Quận 5', chucVu: 'NVBH', loaiLich: 'xoay_ca', trangThai: 'active' },
  { id: 'e3', ma: 'NV0041', ten: 'Vũ Quang Huy', donVi: 'MTM Quận 5', chucVu: 'NVBH', loaiLich: 'xoay_ca', trangThai: 'active' },
  { id: 'e4', ma: 'NV0055', ten: 'Lê Thị Lan', donVi: 'MTM Thủ Đức', chucVu: 'QLCH', loaiLich: 'xoay_ca', trangThai: 'active' },
  { id: 'e5', ma: 'NV0067', ten: 'Phạm Đức Duy', donVi: 'MTM Thủ Đức', chucVu: 'Thu ngân', loaiLich: 'xoay_ca', trangThai: 'thu_viec' },
  { id: 'e6', ma: 'NV0071', ten: 'Hoàng Minh Châu', donVi: 'Phòng Marketing', chucVu: 'Chuyên viên', loaiLich: 'co_dinh', trangThai: 'active' },
  { id: 'e7', ma: 'NV0080', ten: 'Đặng Văn Sơn', donVi: 'Phòng Kế toán', chucVu: 'Kế toán viên', loaiLich: 'co_dinh', trangThai: 'nghi' },
];

export const positions = [
  { ten: 'Giám đốc', capBac: 5, nhomLuong: 'L1' },
  { ten: 'Trưởng phòng', capBac: 4, nhomLuong: 'L2' },
  { ten: 'QLCH', capBac: 3, nhomLuong: 'L3' },
  { ten: 'Trợ lý CH', capBac: 2, nhomLuong: 'L4' },
  { ten: 'NVBH', capBac: 1, nhomLuong: 'L5' },
  { ten: 'Thu ngân', capBac: 1, nhomLuong: 'L5' },
];

export const shifts = [
  { ma: 'HC', ten: 'Hành chính', gio: '08:30–17:30', nghi: '12:00–13:30', heso: '1.0', quaNgay: false },
  { ma: 'CA1', ten: 'Cửa hàng sáng', gio: '08:00–16:00', nghi: '30 phút', heso: '1.0', quaNgay: false },
  { ma: 'CA2', ten: 'Cửa hàng chiều', gio: '14:00–22:00', nghi: '30 phút', heso: '1.0', quaNgay: false },
  { ma: 'GAY', ten: 'Ca gãy', gio: '09:00–13:00 + 17:00–21:00', nghi: '—', heso: '1.0', quaNgay: false },
  { ma: 'OFF', ten: 'Nghỉ', gio: '—', nghi: '—', heso: '0', quaNgay: false },
];

export const rosterEmployees = ['Trần Thị Bình', 'Vũ Quang Huy', 'Lê Thị Lan', 'Phạm Đức Duy'];
export const rosterDays = ['T2 25', 'T3 26', 'T4 27', 'T5 28', 'T6 29', 'T7 30', 'CN 31'];
export const roster: string[][] = [
  ['CA1', 'CA1', 'OFF', 'CA2', 'CA2', 'CA1', 'OFF'],
  ['CA2', 'CA2', 'CA1', 'OFF', 'CA1', 'CA2', 'CA1'],
  ['HC', 'HC', 'HC', 'HC', 'HC', 'OFF', 'OFF'],
  ['OFF', 'CA1', 'CA1', 'CA1', 'GAY', 'CA2', 'CA2'],
];

export interface AttRow { nv: string; ca: string; vao: string; ra: string; tre: number; ot: number; trangThai: 'du_cong' | 'tre' | 've_som' | 'thieu_cham' | 'vang' | 'ot'; }
export const attendance: AttRow[] = [
  { nv: 'Trần Thị Bình', ca: 'CA1', vao: '07:58', ra: '16:03', tre: 0, ot: 0, trangThai: 'du_cong' },
  { nv: 'Vũ Quang Huy', ca: 'CA2', vao: '14:12', ra: '22:05', tre: 12, ot: 0, trangThai: 'tre' },
  { nv: 'Lê Thị Lan', ca: 'HC', vao: '08:29', ra: '18:40', tre: 0, ot: 70, trangThai: 'ot' },
  { nv: 'Phạm Đức Duy', ca: 'CA1', vao: '08:05', ra: '', tre: 5, ot: 0, trangThai: 'thieu_cham' },
  { nv: 'Hoàng Minh Châu', ca: 'HC', vao: '', ra: '', tre: 0, ot: 0, trangThai: 'vang' },
];

export interface Req { id: string; loai: string; nguoiNop: string; ngay: string; trangThai: 'cho' | 'duyet' | 'tu_choi'; chiTiet: string; }
export const requests: Req[] = [
  { id: 'r1', loai: 'Đăng ký OT', nguoiNop: 'Lê Thị Lan', ngay: '25/08', trangThai: 'cho', chiTiet: '17:30–19:00 (1.5h) · MTM Thủ Đức' },
  { id: 'r2', loai: 'Đơn nghỉ phép', nguoiNop: 'Trần Thị Bình', ngay: '28/08', trangThai: 'cho', chiTiet: 'Nghỉ phép năm 1 ngày' },
  { id: 'r3', loai: 'Giải trình quên chấm', nguoiNop: 'Phạm Đức Duy', ngay: '25/08', trangThai: 'cho', chiTiet: 'Quên chấm ra CA1' },
  { id: 'r4', loai: 'Đổi ca', nguoiNop: 'Vũ Quang Huy', ngay: '27/08', trangThai: 'cho', chiTiet: 'Nhờ Lê Thị Lan làm thay CA2' },
  { id: 'r5', loai: 'Điều động hỗ trợ', nguoiNop: 'QLCH Q5', ngay: '29/08', trangThai: 'cho', chiTiet: 'Trần Thị Bình hỗ trợ Thủ Đức 1 ngày' },
];

export interface PayRow { nv: string; congChuan: number; congTt: number; ot: string; hoaHong: string; phuCap: string; khauTru: string; thucNhan: string; }
export const payroll = {
  ky: '08/2026', trangThai: 'Đang mở', ngayChotCong: '03/09', ngayChiLuong: '07/09',
  rows: [
    { nv: 'Trần Thị Bình', congChuan: 26, congTt: 25, ot: '320.000', hoaHong: '2.400.000', phuCap: '800.000', khauTru: '1.150.000', thucNhan: '9.870.000' },
    { nv: 'Vũ Quang Huy', congChuan: 26, congTt: 26, ot: '0', hoaHong: '1.800.000', phuCap: '800.000', khauTru: '1.100.000', thucNhan: '9.300.000' },
    { nv: 'Lê Thị Lan', congChuan: 26, congTt: 26, ot: '1.250.000', hoaHong: '0', phuCap: '1.500.000', khauTru: '1.480.000', thucNhan: '13.270.000' },
    { nv: 'Phạm Đức Duy', congChuan: 26, congTt: 24, ot: '0', hoaHong: '0', phuCap: '500.000', khauTru: '620.000', thucNhan: '6.180.000' },
  ] as PayRow[],
};

export const payslip = {
  nv: 'Lê Thị Lan', ma: 'NV0055', ky: '08/2026', donVi: 'MTM Thủ Đức', chucVu: 'QLCH',
  thuNhap: [
    ['Lương cơ bản (26/26 công)', '11.000.000'],
    ['Làm thêm giờ (OT)', '1.250.000'],
    ['Phụ cấp chức vụ', '1.000.000'],
    ['Phụ cấp xăng xe / điện thoại', '500.000'],
  ],
  khauTru: [
    ['BHXH-BHYT-BHTN (10.5%)', '1.155.000'],
    ['Thuế TNCN', '325.000'],
  ],
  gop: '13.750.000', tongTru: '1.480.000', thucNhan: '12.270.000',
};

export const params = [
  { nhom: 'Bảo hiểm', ten: 'BHXH (NLĐ)', giaTri: '8%', tuNgay: '01/07/2025' },
  { nhom: 'Bảo hiểm', ten: 'BHYT (NLĐ)', giaTri: '1.5%', tuNgay: '01/07/2025' },
  { nhom: 'Bảo hiểm', ten: 'BHTN (NLĐ)', giaTri: '1%', tuNgay: '01/07/2025' },
  { nhom: 'Thuế', ten: 'Giảm trừ bản thân', giaTri: '11.000.000', tuNgay: '01/07/2020' },
  { nhom: 'Thuế', ten: 'Giảm trừ người phụ thuộc', giaTri: '4.400.000', tuNgay: '01/07/2020' },
  { nhom: 'Lương', ten: 'Lương tối thiểu vùng I', giaTri: '4.960.000', tuNgay: '01/07/2024' },
  { nhom: 'OT', ten: 'Hệ số OT ngày thường', giaTri: '150%', tuNgay: '01/01/2021' },
  { nhom: 'OT', ten: 'Hệ số OT ngày lễ', giaTri: '300%', tuNgay: '01/01/2021' },
];
