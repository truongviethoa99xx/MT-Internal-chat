import Link from 'next/link';
import { payroll } from '@/lib/hrm-mock';
const ini = (s: string) => s.trim().split(' ').pop()?.[0] ?? '?';

export default function Luong() {
  return (
    <>
      <div className="page-head">
        <div><h1>Bảng lương kỳ {payroll.ky}</h1><p>Chốt công {payroll.ngayChotCong} · chi lương {payroll.ngayChiLuong}</p></div>
        <div className="page-actions"><span className="bdg bdg-warn" style={{ alignSelf: 'center' }}>{payroll.trangThai}</span><button className="btn">Xuất Excel</button><button className="btn btn-primary">Chạy lương</button></div>
      </div>
      <div className="table-wrap"><div className="table-scroll"><table className="table">
        <thead><tr><th>Nhân viên</th><th className="right">Công chuẩn</th><th className="right">Công TT</th><th className="right">OT</th><th className="right">Hoa hồng</th><th className="right">Phụ cấp</th><th className="right">Khấu trừ</th><th className="right">Thực nhận</th><th></th></tr></thead>
        <tbody>
          {payroll.rows.map((r, i) => (
            <tr key={i}>
              <td><div className="person"><span className="avatar-sm">{ini(r.nv)}</span>{r.nv}</div></td>
              <td className="right mono">{r.congChuan}</td><td className="right mono">{r.congTt}</td>
              <td className="right mono">{r.ot}</td><td className="right mono">{r.hoaHong}</td><td className="right mono">{r.phuCap}</td>
              <td className="right mono">{r.khauTru}</td><td className="right mono" style={{ fontWeight: 700 }}>{r.thucNhan}</td>
              <td><Link className="link" href={`/luong/phieu/${i}`}>Phiếu</Link></td>
            </tr>
          ))}
        </tbody>
      </table></div></div>
    </>
  );
}
