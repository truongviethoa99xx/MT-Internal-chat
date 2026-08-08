import { donCuaToi } from '@/lib/ess-mock';

const B: Record<string, [string, string]> = { cho: ['bdg-warn', 'Chờ duyệt'], duyet: ['bdg-ok', 'Đã duyệt'], tu_choi: ['bdg-danger', 'Từ chối'] };
const TYPES = ['Nghỉ phép', 'Đăng ký OT', 'Đổi ca', 'Giải trình chấm công'];

export default function MyDon() {
  return (
    <>
      <div className="page-head"><div><h1>Đơn từ</h1><p>Nộp đơn và theo dõi trạng thái</p></div><div className="page-actions"><button className="btn btn-primary">+ Nộp đơn</button></div></div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {TYPES.map((t) => <button key={t} className="btn btn-sm">{t}</button>)}
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {donCuaToi.map((d, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div><div style={{ fontWeight: 600 }}>{d.loai}</div><div style={{ fontSize: 13, color: 'var(--muted)' }}>{d.chiTiet} · {d.ngay}</div></div>
            <span className={`bdg ${B[d.trangThai][0]}`}>{B[d.trangThai][1]}</span>
          </div>
        ))}
      </div>
    </>
  );
}
