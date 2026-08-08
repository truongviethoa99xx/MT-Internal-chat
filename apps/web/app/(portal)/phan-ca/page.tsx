import { rosterEmployees, rosterDays, roster } from '@/lib/hrm-mock';

const LEGEND: [string, string][] = [['CA1', '08:00–16:00'], ['CA2', '14:00–22:00'], ['HC', '08:30–17:30'], ['GAY', 'Ca gãy'], ['OFF', 'Nghỉ']];

export default function PhanCa() {
  return (
    <>
      <div className="page-head">
        <div><h1>Phân ca</h1><p>Tuần 25–31/08 · MTM Thủ Đức · roster xoay ca</p></div>
        <div className="page-actions"><button className="btn">Copy tuần trước</button><button className="btn btn-primary">Chốt roster</button></div>
      </div>
      <div className="card">
        <div className="roster">
          <div className="rhead"><div>Nhân viên</div>{rosterDays.map((d) => <div key={d}>{d}</div>)}</div>
          {rosterEmployees.map((nv, ri) => (
            <div className="rrow" key={nv}>
              <div className="nm">{nv}</div>
              {roster[ri].map((code, ci) => <div key={ci}><span className={`sh sh-${code}`}>{code}</span></div>)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: 'var(--muted)' }}>
          {LEGEND.map(([c, t]) => (
            <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span className={`sh sh-${c}`} style={{ padding: '2px 9px' }}>{c}</span>{t}</span>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginTop: 16, borderLeft: '3px solid #F59E0B' }}>
        <b style={{ fontSize: 13 }}>⚠ Cảnh báo ràng buộc xếp ca</b>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)' }}>Vũ Quang Huy: CA2 (T7 22:00) → CA1 (CN 08:00) chỉ nghỉ <b>10 giờ</b> (&lt; 12h). Cần duyệt ngoại lệ trước khi chốt.</p>
      </div>
    </>
  );
}
