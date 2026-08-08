import { orgTree, type OrgNode } from '@/lib/hrm-mock';

const LABEL: Record<string, string> = { 'Công ty': 'Công ty', khoi: 'Khối', phong_ban: 'Phòng ban', bo_phan: 'Bộ phận', cua_hang: 'Cửa hàng' };

function Node({ n }: { n: OrgNode }) {
  return (
    <li className="node">
      <div className="row">
        <strong style={{ fontSize: 14 }}>{n.ten}</strong>
        <span className={`tag ${n.loai}`}>{LABEL[n.loai] ?? n.loai}</span>
      </div>
      {n.children ? <ul>{n.children.map((c, i) => <Node key={i} n={c} />)}</ul> : null}
    </li>
  );
}

export default function ToChuc() {
  return (
    <>
      <div className="page-head">
        <div><h1>Cơ cấu tổ chức</h1><p>Cây đơn vị — khối / phòng ban / bộ phận / cửa hàng. Thêm cấp chỉ việc thêm node.</p></div>
        <div className="page-actions"><button className="btn btn-primary">+ Thêm đơn vị</button></div>
      </div>
      <div className="card"><ul className="tree"><Node n={orgTree} /></ul></div>
    </>
  );
}
