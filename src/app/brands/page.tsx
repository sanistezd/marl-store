import Link from 'next/link';

export default function BrandsPage() {
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
      
      <div className="inner-container">
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>Бренды-партнеры</h1>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>Мы сотрудничаем с лучшими отечественными и зарубежными производителями.</p>
        
        <div className="brands-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
           {['EON ENERGY', 'ZAVOD', 'CHIKALAB', 'НЕ ПРОСТО СОУС', 'Buldak', 'Dr Pepper', 'Flash Energy', 'Calbee'].map((brand, i) => (
             <div key={i} className={`brand-card brand-${(i % 4) + 1}`} style={{ minHeight: '250px' }}>
               <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{brand}</h3>
               <p style={{ fontSize: '0.95rem' }}>Уникальные товары прямиком с производства.</p>
               <button className="brand-btn" style={{ marginTop: 'auto' }}>Перейти к товарам</button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
