import { params } from '@/lib/hrm-mock';

export default function CauHinh() {
  return (
    <>
      <div className="page-head">
        <div><h1>Cấu hình tham số</h1><p>BHXH · thuế · lương tối thiểu · hệ số OT — hiệu lực theo thời gian, không hard-code</p></div>
        <div className="page-actions"><button className="btn btn-primary">+ Thêm tham số</button></div>
      </div>
      <div className="table-wrap"><div className="table-scroll"><table className="table">
        <thead><tr><th>Nhóm</th><th>Tham số</th><th>Giá trị</th><th>Hiệu lực từ</th></tr></thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i}><td><span className="bdg bdg-muted">{p.nhom}</span></td><td style={{ fontWeight: 600 }}>{p.ten}</td><td className="mono">{p.giaTri}</td><td className="mono">{p.tuNgay}</td></tr>
          ))}
        </tbody>
      </table></div></div>
      <div className="card" style={{ marginTop: 16 }}>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Luật đổi chỉ cần thêm dòng tham số mới với ngày hiệu lực — các kỳ cũ vẫn tính đúng theo tham số tại thời điểm đó.</p>
      </div>
    </>
  );
}
