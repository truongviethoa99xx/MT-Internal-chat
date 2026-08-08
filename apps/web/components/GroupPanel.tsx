const MEMBERS: [string, string, string][] = [
  ['NA', 'Nguyễn Văn An', 'Trưởng phòng'],
  ['TB', 'Trần Thị Bình', 'Nhân viên'],
  ['VH', 'Vũ Quang Huy', 'Nhân viên'],
];

export function GroupPanel() {
  return (
    <aside className="panel">
      <div className="head">
        <div className="big">KD</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>Phòng Kinh doanh</div>
        <span className="tag-1o" style={{ marginTop: 8 }}>Đồng bộ 1Office</span>
      </div>
      <div className="note">
        Thành viên đồng bộ tự động từ phòng Kinh doanh. Không thể thêm hoặc xoá thành viên trực tiếp.
      </div>
      <div className="sec-label" style={{ padding: '0 0 12px' }}>24 thành viên</div>
      {MEMBERS.map(([a, n, r]) => (
        <div className="member" key={n}>
          <div className="mini">{a}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{n}</div>
            <div style={{ fontSize: 11, color: 'var(--faint)' }}>{r}</div>
          </div>
        </div>
      ))}
    </aside>
  );
}
