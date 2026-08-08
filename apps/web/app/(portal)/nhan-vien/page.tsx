import Link from 'next/link';
import { employees } from '@/lib/hrm-mock';

const ST: Record<string, [string, string]> = { active: ['bdg-ok', 'Đang làm'], thu_viec: ['bdg-warn', 'Thử việc'], nghi: ['bdg-muted', 'Đã nghỉ'] };
const ini = (s: string) => s.trim().split(' ').pop()?.[0] ?? '?';

export default function NhanVien() {
  return (
    <>
      <div className="page-head">
        <div><h1>Nhân viên</h1><p>248 nhân sự · hiển thị 7 (demo)</p></div>
        <div className="page-actions"><button className="btn">Import Excel</button><button className="btn btn-primary">+ Thêm nhân viên</button></div>
      </div>
      <div className="filters">
        <input className="input" placeholder="Tìm tên / mã NV..." />
        <select className="input"><option>Tất cả đơn vị</option><option>Khối văn phòng</option><option>Khối cửa hàng</option></select>
        <select className="input"><option>Tất cả trạng thái</option><option>Đang làm</option><option>Thử việc</option></select>
      </div>
      <div className="table-wrap"><div className="table-scroll"><table className="table">
        <thead><tr><th>Mã NV</th><th>Họ tên</th><th>Đơn vị</th><th>Chức vụ</th><th>Lịch</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td className="mono">{e.ma}</td>
              <td><div className="person"><span className="avatar-sm">{ini(e.ten)}</span>{e.ten}</div></td>
              <td>{e.donVi}</td><td>{e.chucVu}</td>
              <td>{e.loaiLich === 'co_dinh' ? 'Cố định' : 'Xoay ca'}</td>
              <td><span className={`bdg ${ST[e.trangThai][0]}`}>{ST[e.trangThai][1]}</span></td>
              <td><Link className="link" href={`/nhan-vien/${e.id}`}>Hồ sơ</Link></td>
            </tr>
          ))}
        </tbody>
      </table></div></div>
    </>
  );
}
