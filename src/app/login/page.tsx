'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    router.push('/profile');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Стандартная шапка сайта */}
      <header className="header" style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 20 }}>
        <Link href="/" className="logo-area" style={{ textDecoration: 'none', color: '#fff' }}>
          <svg viewBox="0 0 24 24" fill="white" className="logo-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
          <div>
            <div style={{ lineHeight: 1 }}>SHARKET</div>
            <div style={{ fontSize: '0.6rem', color: '#888' }}>FOOD & DRINKS</div>
          </div>
        </Link>
        <div className="header-center">
          <Link href="/catalog" className="catalog-btn" style={{ textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            Каталог
          </Link>
        </div>
        <nav className="header-nav">
          <Link href="/about">О нас</Link>
          <Link href="/delivery">Доставка</Link>
          <Link href="/brands">Брендам<span className="nav-dot"></span></Link>
        </nav>
        <div className="header-actions">
          <Link href="/register" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></Link>
          <Link href="/favorites" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></Link>
          <Link href="/cart" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></Link>
        </div>
      </header>

      {/* Пиздатый фон с блюром */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
      
      {/* Карточка входа */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', maxWidth: '480px', padding: '3rem', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(30px)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>С возвращением</h1>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>Войдите в свой аккаунт SHARKET</p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#aaa', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
              <input type="email" placeholder="alex@example.com" style={{ width: '100%', padding: '1.2rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', outline: 'none', transition: 'all 0.3s', fontSize: '1rem' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: 600 }}>Пароль</label>
                <a href="#" style={{ fontSize: '0.85rem', color: '#3b82f6', textDecoration: 'none' }}>Забыли пароль?</a>
              </div>
              <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '1.2rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', outline: 'none', transition: 'all 0.3s', fontSize: '1rem' }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            
            <button type="button" onClick={handleLogin} style={{ width: '100%', marginTop: '1rem', background: '#fff', color: '#000', padding: '1.2rem', borderRadius: '16px', fontWeight: 800, fontSize: '1.1rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              Войти
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: '#888' }}>
            Нет аккаунта? <Link href="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #fff', paddingBottom: '2px' }}>Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
