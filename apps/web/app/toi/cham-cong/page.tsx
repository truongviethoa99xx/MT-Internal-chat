import { caHomNay, chamCongGanDay } from '@/lib/ess-mock';

const B: Record<string, [string, string]> = { du_cong: ['bdg-ok', 'Đủ công'], tre: ['bdg-warn', 'Trễ'], thieu_cham: ['bdg-info', 'Thiếu chấm'], vang: ['bdg-danger', 'Vắng'] };

export default function MyChamCong() {
  return (
    <>
      <div className="page-head"><div><h1>Chấm công của tôi</h1><p>25/08/2026 · {caHomNay.ca} {caHomNay.gio}</p></div></div>
      <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>{caHomNay.diaDiem} · {caHomNay.trangThai}</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '14px 28px' }}>Chấm vào</button>
          <button className="btn" style={{ padding: '14px 28px' }}>Chấm ra</button>
        </div>
        <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 12 }}>Chấm trên app cần bật GPS + selfie (theo chính sách)</div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Lịch sử gần đây</h3></div>
        <div className="table-scroll"><table className="table">
          <thead><tr><th>Ngày</th><th>Ca</th><th>Vào</th><th>Ra</th><th>Kết quả</th></tr></thead>
          <tbody>
            {chamCongGanDay.map((r, i) => (
              <tr key={i}><td className="mono">{r.ngay}</td><td>{r.ca}</td><td className="mono">{r.vao}</td><td className="mono">{r.ra || '—'}</td><td><span className={`bdg ${B[r.trangThai][0]}`}>{B[r.trangThai][1]}</span></td></tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </>
  );
}
