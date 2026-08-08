import { phieuLuong } from '@/lib/ess-mock';
import { payslip } from '@/lib/hrm-mock';

export default function MyLuong() {
  const p = payslip;
  return (
    <>
      <div className="page-head"><div><h1>Phiếu lương</h1><p>Các kỳ gần đây</p></div></div>
      <div className="table-wrap" style={{ marginBottom: 22 }}><div className="table-scroll"><table className="table">
        <thead><tr><th>Kỳ lương</th><th className="right">Thực nhận</th><th></th></tr></thead>
        <tbody>
          {phieuLuong.map((k) => (
            <tr key={k.ky}><td style={{ fontWeight: 600 }}>{k.ky}</td><td className="right mono">{k.thucNhan} ₫</td><td className="right"><span className="link">Xem</span></td></tr>
          ))}
        </tbody>
      </table></div></div>

      <h3 style={{ fontSize: 15, margin: '0 0 12px' }}>Chi tiết kỳ {p.ky}</h3>
      <div className="payslip">
        <div className="ph">
          <div><div style={{ fontWeight: 800, fontSize: 16 }}>{p.nv}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.donVi} · {p.chucVu}</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, color: 'var(--faint)' }}>Kỳ lương</div><div style={{ fontWeight: 700 }}>{p.ky}</div></div>
        </div>
        <div className="pgroup">Thu nhập</div>
        {p.thuNhap.map(([k, v], i) => <div key={i} className="pline"><span>{k}</span><span className="mono">{v}</span></div>)}
        <div className="pline sum"><span>Tổng thu nhập (gộp)</span><span className="mono">{p.gop}</span></div>
        <div className="pgroup">Khấu trừ</div>
        {p.khauTru.map(([k, v], i) => <div key={i} className="pline"><span>{k}</span><span className="mono">− {v}</span></div>)}
        <div className="pline sum"><span>Thực nhận</span><span className="mono">{p.thucNhan}</span></div>
      </div>
    </>
  );
}
