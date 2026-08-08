import Link from 'next/link';
import { me, caHomNay, caTuan, quyPhep, congThang, phieuLuong, donCuaToi } from '@/lib/ess-mock';

export default function EssHome() {
  const donCho = donCuaToi.filter((d) => d.trangThai === 'cho').length;
  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>Chào {me.ten.split(' ').pop()} 👋</h1>
      <p style={{ color: 'var(--muted)', margin: '0 0 20px', fontSize: 14 }}>{me.donVi} · {me.chucVu}</p>

      <div className="card" style={{ borderLeft: '3px solid var(--indigo)', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--faint)' }}>Ca hôm nay</div>
            <div style={{ fontSize: 18, fontWeight: 800, margin: '2px 0' }}>{caHomNay.ca} · {caHomNay.gio}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{caHomNay.diaDiem} · {caHomNay.trangThai}</div>
          </div>
          <Link href="/toi/cham-cong" className="btn btn-primary">Chấm công vào</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <div className="stat"><div className="lbl">Công tháng 08</div><div className="val">{congThang.thucTe}<span style={{ fontSize: 14, color: 'var(--faint)' }}>/{congThang.chuan}</span></div><div className="sub">ngày công</div></div>
        <div className="stat"><div className="lbl">Quỹ phép còn</div><div className="val">{quyPhep.conLai}</div><div className="sub">/{quyPhep.capPhat} ngày</div></div>
        <div className="stat"><div className="lbl">Đơn chờ duyệt</div><div className="val">{donCho}</div><div className="sub">đơn của tôi</div></div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-h"><h3>Ca tuần này</h3><Link href="/toi/ca">Xem lịch</Link></div>
        {caTuan.map((c) => (
          <div key={c.ngay} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
            <span style={{ fontSize: 13 }}>{c.ngay}</span>
            <span className={`sh sh-${c.ca}`} style={{ minWidth: 150, padding: '4px 12px' }}>{c.ca === 'OFF' ? 'Nghỉ' : `${c.ca} · ${c.gio}`}</span>
          </div>
        ))}
      </div>

      <Link href="/toi/luong" className="card" style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: 12, color: 'var(--faint)' }}>Phiếu lương mới nhất · {phieuLuong[0].ky}</div><div style={{ fontSize: 18, fontWeight: 800 }}>{phieuLuong[0].thucNhan} ₫</div></div>
        <span className="link">Xem ›</span>
      </Link>
    </>
  );
}
