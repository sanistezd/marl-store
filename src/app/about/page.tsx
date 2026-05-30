import Link from 'next/link';

export default function AboutPage() {
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
          <Link href="/about" style={{color: '#fff'}}>О нас</Link>
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
        <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden' }}>
          <div style={{ height: '300px', background: 'url(https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200) center/cover' }}></div>
          <div style={{ padding: '3rem' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>О компании SHARKET</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              SHARKET — это не просто магазин, это философия поиска самых редких, интересных и качественных продуктов питания и напитков со всего мира. Наша цель — дать вам возможность попробовать то, что вы не найдете на полках обычных супермаркетов.
            </p>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Поддержка отечественного производителя</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Мы уделяем особое внимание локальным брендам. Многие крутые российские производители делают продукт, который превосходит западные аналоги, но у них нет бюджетов на маркетинг.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
