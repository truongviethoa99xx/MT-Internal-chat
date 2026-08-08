import Link from 'next/link';
import { employees } from '@/lib/hrm-mock';

const Row = ({ k, v }: { k: string; v: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13.5 }}>
    <span style={{ color: 'var(--muted)' }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
  </div>
);

export default function EmpDetail({ params }: { params: { id: string } }) {
  const e = employees.find((x) => x.id === params.id) ?? employees[0];
  return (
    <>
      <div className="page-head">
        <div><h1>{e.ten}</h1><p>{e.ma} · {e.donVi} · {e.chucVu}</p></div>
        <div className="page-actions"><Link href="/nhan-vien" className="btn">‹ Danh sách</Link><button className="btn">Điều chuyển</button><button className="btn btn-primary">Sửa hồ sơ</button></div>
      </div>
      <div className="tabs"><a className="on">Hồ sơ</a><a>Biên chế</a><a>Chấm công</a><a>Lương</a><a>Hợp đồng</a></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-h"><h3>Thông tin cá nhân</h3></div>
          <Row k="Mã nhân viên" v={e.ma} />
          <Row k="Loại lịch" v={e.loaiLich === 'co_dinh' ? 'Cố định (HC)' : 'Xoay ca'} />
          <Row k="Ngày vào làm" v="12/03/2024" />
          <Row k="Loại hợp đồng" v={e.trangThai === 'thu_viec' ? 'Thử việc (85%)' : 'Chính thức — 12 tháng'} />
          <Row k="SĐT" v="09xx xxx xxx" />
        </div>
        <div className="card">
          <div className="card-h"><h3>Biên chế & kiêm nhiệm</h3></div>
          <div className="table-scroll"><table className="table"><thead><tr><th>Đơn vị</th><th>Chức vụ</th><th>Chính</th><th>Từ ngày</th></tr></thead><tbody>
            <tr><td>{e.donVi}</td><td>{e.chucVu}</td><td><span className="bdg bdg-ok">Chính</span></td><td className="mono">12/03/2024</td></tr>
            <tr><td>Ban đào tạo vùng</td><td>Cộng tác</td><td><span className="bdg bdg-muted">Kiêm</span></td><td className="mono">01/06/2025</td></tr>
          </tbody></table></div>
        </div>
      </div>
      <div style={{ height: 16 }} />
      <div className="card">
        <div className="card-h"><h3>Quỹ phép năm 2026</h3></div>
        <div style={{ display: 'flex', gap: 40 }}>
          <div><div style={{ fontSize: 24, fontWeight: 800 }}>12</div><div style={{ fontSize: 12, color: 'var(--faint)' }}>Được cấp</div></div>
          <div><div style={{ fontSize: 24, fontWeight: 800, color: '#B45309' }}>7</div><div style={{ fontSize: 12, color: 'var(--faint)' }}>Đã dùng</div></div>
          <div><div style={{ fontSize: 24, fontWeight: 800, color: '#15803D' }}>5</div><div style={{ fontSize: 12, color: 'var(--faint)' }}>Còn lại</div></div>
        </div>
      </div>
    </>
  );
}
