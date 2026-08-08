import { caTuan } from '@/lib/ess-mock';

export default function MyCa() {
  return (
    <>
      <div className="page-head"><div><h1>Ca của tôi</h1><p>Tuần 25–31/08 · MTM Quận 5</p></div></div>
      <div className="card">
        {caTuan.map((c) => (
          <div key={c.ngay} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #F3F4F6' }}>
            <div><div style={{ fontWeight: 600 }}>{c.ngay}</div><div style={{ fontSize: 12, color: 'var(--faint)' }}>{c.diaDiem ?? (c.ca === 'OFF' ? 'Ngày nghỉ' : '')}</div></div>
            <span className={`sh sh-${c.ca}`} style={{ minWidth: 160, padding: '5px 12px' }}>{c.ca === 'OFF' ? 'Nghỉ' : `${c.ca} · ${c.gio}`}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--faint)', marginTop: 12 }}>Roster do QLCH chốt trước 3–7 ngày. Muốn đổi ca → nộp đơn ở mục Đơn từ.</p>
    </>
  );
}
