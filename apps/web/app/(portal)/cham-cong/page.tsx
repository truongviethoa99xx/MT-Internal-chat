import { attendance } from '@/lib/hrm-mock';

const B: Record<string, [string, string]> = { du_cong: ['bdg-ok', 'Đủ công'], tre: ['bdg-warn', 'Trễ'], ve_som: ['bdg-warn', 'Về sớm'], thieu_cham: ['bdg-info', 'Thiếu chấm'], vang: ['bdg-danger', 'Vắng'], ot: ['bdg-info', 'OT'] };
const ini = (s: string) => s.trim().split(' ').pop()?.[0] ?? '?';

export default function ChamCong() {
  return (
    <>
      <div className="page-head">
        <div><h1>Đối soát công</h1><p>Ngày 25/08/2026 · MTM Thủ Đức · cron chạy 23:30 hàng ngày</p></div>
        <div className="page-actions"><button className="btn">Chọn ngày</button><button className="btn btn-primary">Chạy lại đối soát</button></div>
      </div>
      <div className="table-wrap"><div className="table-scroll"><table className="table">
        <thead><tr><th>Nhân viên</th><th>Ca</th><th>Chấm vào</th><th>Chấm ra</th><th className="right">Trễ (ph)</th><th className="right">OT (ph)</th><th>Kết quả</th><th></th></tr></thead>
        <tbody>
          {attendance.map((a, i) => (
            <tr key={i}>
              <td><div className="person"><span className="avatar-sm">{ini(a.nv)}</span>{a.nv}</div></td>
              <td>{a.ca}</td><td className="mono">{a.vao || '—'}</td><td className="mono">{a.ra || '—'}</td>
              <td className="right mono">{a.tre || '—'}</td><td className="right mono">{a.ot || '—'}</td>
              <td><span className={`bdg ${B[a.trangThai][0]}`}>{B[a.trangThai][1]}</span></td>
              <td>{a.trangThai !== 'du_cong' ? <a className="link" href="/don-tu">Tạo đơn</a> : null}</td>
            </tr>
          ))}
        </tbody>
      </table></div></div>
      <div className="card" style={{ marginTop: 16 }}>
        <b style={{ fontSize: 13 }}>Nguyên tắc</b>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)' }}>Không sửa tay bảng công. Mọi điều chỉnh đi qua đơn được duyệt → hệ thống tự chạy lại đối soát ngày đó. Log thô bất biến, không bao giờ ghi đè.</p>
      </div>
    </>
  );
}
