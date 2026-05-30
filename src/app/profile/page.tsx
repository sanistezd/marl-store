'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuth, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuth) {
      router.push('/login');
    }
  }, [mounted, isAuth, router]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push('/login');
  };

  if (!mounted || !isAuth) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f2f3f7', color: '#111' }}>
      <header className="header" style={{ background: '#0a0a0a' }}>
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
          <div className="search-bar">
            <input type="text" placeholder="Поиск товаров..." />
          </div>
        </div>
        <nav className="header-nav">
          <Link href="/about">О нас</Link>
          <Link href="/delivery">Доставка</Link>
          <Link href="/brands">Брендам<span className="nav-dot"></span></Link>
        </nav>
        <div className="header-actions">
          <Link href="/profile" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></Link>
          <Link href="/favorites" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></Link>
          <Link href="/cart" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span className="cart-badge">0</span></Link>
        </div>
      </header>
      
      <div className="two-column-layout">
        <aside className="two-column-sidebar">
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '80px', height: '80px', background: '#e5e7eb', borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👤</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Иван Иванов</h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>+7 (999) 123-45-67</p>
          </div>
          <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden' }}>
            <a href="#" style={{ display: 'block', padding: '1.2rem 2rem', borderBottom: '1px solid #eee', textDecoration: 'none', color: '#111', fontWeight: 600, background: '#fafafa' }}>📦 Мои заказы</a>
            <a href="#" style={{ display: 'block', padding: '1.2rem 2rem', borderBottom: '1px solid #eee', textDecoration: 'none', color: '#666' }}>❤️ Избранное</a>
            <a href="#" onClick={handleLogout} style={{ display: 'block', padding: '1.2rem 2rem', textDecoration: 'none', color: '#ef4444', cursor: 'pointer' }}>Выйти</a>
          </div>
        </aside>

        <main className="two-column-main">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Мои заказы</h1>
          {[1284, 1283].map(orderNum => (
             <div key={orderNum} style={{ background: '#fff', padding: '2rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                 <div>
                   <h3 style={{ fontSize: '1.2rem' }}>Заказ #{orderNum}</h3>
                   <span style={{ color: '#888', fontSize: '0.9rem' }}>От 24 мая 2026</span>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#dcfce7', color: '#166534', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Доставлен</span>
                   <div style={{ fontWeight: 800 }}>850 ₽</div>
                 </div>
               </div>
               <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                 <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=100" style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#f9f9f9', borderRadius: '8px' }} alt="Item" />
               </div>
             </div>
          ))}
        </main>
      </div>
    </div>
  );
}
