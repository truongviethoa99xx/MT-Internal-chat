const bars: [string, number][] = [['MTM Quận 5', 82], ['MTM Quận 10', 75], ['MTM Thủ Đức', 68], ['Văn phòng', 44]];

export default function BaoCao() {
  return (
    <>
      <div className="page-head">
        <div><h1>Báo cáo</h1><p>Chi phí nhân sự · chấm công · headcount · hoa hồng</p></div>
        <div className="page-actions"><button className="btn">Kỳ 08/2026</button><button className="btn btn-primary">Xuất Excel</button></div>
      </div>
      <div className="stat-grid">
        <div className="stat"><div className="lbl">Chi phí nhân sự</div><div className="val">2.84 tỷ</div><div className="sub">+3.2% so kỳ trước</div></div>
        <div className="stat"><div className="lbl">Headcount</div><div className="val">248</div><div className="sub">Vào 6 · Ra 2</div></div>
        <div className="stat"><div className="lbl">Tỷ lệ nghỉ việc</div><div className="val">1.6%</div><div className="sub">Tháng này</div></div>
        <div className="stat"><div className="lbl">Giờ OT</div><div className="val">1.240h</div><div className="sub">2 người chạm 80% trần</div></div>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-h"><h3>Chi phí lương theo đơn vị (triệu ₫)</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
            {bars.map(([n, v]) => (
              <div key={n}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}><span>{n}</span><span className="mono">{v * 10}</span></div>
                <div style={{ height: 8, background: '#F3F4F6', borderRadius: 999 }}><div style={{ width: `${v}%`, height: 8, background: 'var(--indigo)', borderRadius: 999 }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Tuân thủ ca kíp</h3></div>
          <div className="table-scroll"><table className="table"><thead><tr><th>Chỉ số</th><th className="right">Số</th></tr></thead><tbody>
            <tr><td>Vi phạm nghỉ 12h giữa ca</td><td className="right"><span className="bdg bdg-warn">3</span></td></tr>
            <tr><td>Chạm trần OT tháng</td><td className="right"><span className="bdg bdg-danger">2</span></td></tr>
            <tr><td>Thiếu chấm chưa giải trình</td><td className="right"><span className="bdg bdg-info">5</span></td></tr>
            <tr><td>Quỹ phép tồn cuối năm (ngày)</td><td className="right mono">312</td></tr>
          </tbody></table></div>
        </div>
      </div>
    </>
  );
}
