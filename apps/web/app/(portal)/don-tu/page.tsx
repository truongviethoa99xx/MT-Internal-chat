import { requests } from '@/lib/hrm-mock';

export default function DonTu() {
  return (
    <>
      <div className="page-head">
        <div><h1>Đơn từ chờ duyệt</h1><p>Duyệt theo cấp bậc + cây tổ chức · 9 đơn</p></div>
        <div className="page-actions"><button className="btn">Đã duyệt</button><button className="btn">Từ chối</button></div>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {requests.map((r) => (
          <div key={r.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span className="bdg bdg-info">{r.loai}</span><span className="bdg bdg-warn">Chờ</span></div>
              <div style={{ fontWeight: 600, marginTop: 8 }}>{r.nguoiNop}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{r.chiTiet} · áp dụng {r.ngay}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}><button className="btn btn-sm">Từ chối</button><button className="btn btn-primary btn-sm">Duyệt</button></div>
          </div>
        ))}
      </div>
    </>
  );
}
