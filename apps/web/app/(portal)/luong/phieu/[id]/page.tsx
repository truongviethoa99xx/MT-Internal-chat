import Link from 'next/link';
import { payslip } from '@/lib/hrm-mock';

export default function Phieu() {
  const p = payslip;
  return (
    <>
      <div className="page-head">
        <div><h1>Phiếu lương</h1><p>{p.nv} · {p.ma} · kỳ {p.ky}</p></div>
        <div className="page-actions"><Link href="/luong" className="btn">‹ Bảng lương</Link><button className="btn">Tải PDF</button></div>
      </div>
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
      <p style={{ fontSize: 12, color: 'var(--faint)', marginTop: 12, maxWidth: 640 }}>Phiếu lương là snapshot bất biến: lưu toàn bộ tham số (BHXH/thuế) + số liệu đầu vào tại thời điểm chốt để đối chiếu về sau.</p>
    </>
  );
}
