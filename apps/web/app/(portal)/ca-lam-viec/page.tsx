import { shifts } from '@/lib/hrm-mock';

export default function CaLamViec() {
  return (
    <>
      <div className="page-head">
        <div><h1>Ca làm việc</h1><p>Định nghĩa ca — giờ, nghỉ giữa ca, ngưỡng grace, hệ số</p></div>
        <div className="page-actions"><button className="btn btn-primary">+ Thêm ca</button></div>
      </div>
      <div className="table-wrap"><div className="table-scroll"><table className="table">
        <thead><tr><th>Mã</th><th>Tên ca</th><th>Giờ</th><th>Nghỉ giữa ca</th><th>Grace</th><th>Hệ số</th><th>Qua ngày</th></tr></thead>
        <tbody>
          {shifts.map((s) => (
            <tr key={s.ma}><td><span className={`sh sh-${s.ma}`} style={{ padding: '3px 10px' }}>{s.ma}</span></td><td style={{ fontWeight: 600 }}>{s.ten}</td><td className="mono">{s.gio}</td><td>{s.nghi}</td><td className="mono">5 phút</td><td className="mono">{s.heso}</td><td>{s.quaNgay ? <span className="bdg bdg-warn">Có</span> : <span className="bdg bdg-muted">Không</span>}</td></tr>
          ))}
        </tbody>
      </table></div></div>
    </>
  );
}
