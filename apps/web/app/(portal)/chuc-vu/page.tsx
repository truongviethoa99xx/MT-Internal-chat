import { positions } from '@/lib/hrm-mock';

export default function ChucVu() {
  return (
    <>
      <div className="page-head">
        <div><h1>Chức vụ</h1><p>Chức danh dùng chung toàn công ty — tách khỏi đơn vị</p></div>
        <div className="page-actions"><button className="btn btn-primary">+ Thêm chức vụ</button></div>
      </div>
      <div className="table-wrap"><div className="table-scroll"><table className="table">
        <thead><tr><th>Chức danh</th><th>Cấp bậc</th><th>Nhóm lương</th><th>Dùng cho</th></tr></thead>
        <tbody>
          {positions.map((p) => (
            <tr key={p.ten}><td style={{ fontWeight: 600 }}>{p.ten}</td><td><span className="bdg bdg-info">Cấp {p.capBac}</span></td><td className="mono">{p.nhomLuong}</td><td style={{ color: 'var(--muted)' }}>Phân quyền duyệt + dải lương</td></tr>
          ))}
        </tbody>
      </table></div></div>
    </>
  );
}
