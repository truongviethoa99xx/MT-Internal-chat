import { stats, requests, attendance } from '@/lib/hrm-mock';

const statusBdg: Record<string, string> = { du_cong: 'bdg-ok', tre: 'bdg-warn', ve_som: 'bdg-warn', thieu_cham: 'bdg-info', vang: 'bdg-danger', ot: 'bdg-info' };
const statusTxt: Record<string, string> = { du_cong: 'Đủ công', tre: 'Trễ', ve_som: 'Về sớm', thieu_cham: 'Thiếu chấm', vang: 'Vắng', ot: 'OT' };

export default function Dashboard() {
  const canhBao = attendance.filter((a) => a.trangThai !== 'du_cong');
  return (
    <>
      <div className="page-head">
        <div><h1>Tổng quan</h1><p>Kỳ công tháng 08/2026 · cập nhật 08:30</p></div>
        <div className="page-actions"><button className="btn">Xuất Excel</button><button className="btn btn-primary">Chạy đối soát</button></div>
      </div>

      <div className="stat-grid">
        {stats.map((s, i) => (
          <div key={i} className={`stat${i === 3 ? ' accent' : ''}`}>
            <div className="lbl">{s.label}</div><div className="val">{s.value}</div><div className="sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-h"><h3>Cảnh báo đối soát hôm nay</h3><a href="/cham-cong">Xem tất cả</a></div>
          <div className="table-scroll"><table className="table"><thead><tr><th>Nhân viên</th><th>Ca</th><th>Vào</th><th>Ra</th><th>Trạng thái</th></tr></thead><tbody>
            {canhBao.map((a, i) => (
              <tr key={i}><td><div className="person"><span className="avatar-sm">{a.nv.split(' ').pop()?.[0]}</span>{a.nv}</div></td><td>{a.ca}</td><td className="mono">{a.vao || '—'}</td><td className="mono">{a.ra || '—'}</td><td><span className={`bdg ${statusBdg[a.trangThai]}`}>{statusTxt[a.trangThai]}</span></td></tr>
            ))}
          </tbody></table></div>
        </div>

        <div className="card">
          <div className="card-h"><h3>Đơn chờ duyệt</h3><a href="/don-tu">9 đơn</a></div>
          {requests.slice(0, 5).map((r) => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid #F3F4F6' }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{r.loai}</div><div style={{ fontSize: 12, color: 'var(--faint)' }}>{r.nguoiNop} · {r.ngay}</div></div>
              <span className="bdg bdg-warn">Chờ</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
