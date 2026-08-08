import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="logo">MT</div>
        <h1>MTM Chat</h1>
        <div className="sub">Chat nội bộ Minh Tuấn Mobile</div>
        <button className="btn-primary">Đăng nhập bằng 1Office</button>
        <div className="divider">hoặc</div>
        <input className="field" placeholder="Tên đăng nhập nội bộ" />
        <input className="field" type="password" placeholder="Mật khẩu" />
        <Link href="/" className="btn-ghost">Đăng nhập</Link>
        <a className="forgot" href="#">Quên mật khẩu?</a>
      </div>
    </div>
  );
}
