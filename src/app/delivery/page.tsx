import Link from 'next/link';

export default function DeliveryPage() {
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
          <Link href="/delivery" style={{color: '#fff'}}>Доставка</Link>
          <Link href="/brands">Брендам<span className="nav-dot"></span></Link>
        </nav>
        <div className="header-actions">
          <Link href="/profile" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></Link>
          <Link href="/favorites" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></Link>
          <Link href="/cart" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span className="cart-badge">0</span></Link>
        </div>
      </header>
      
      <div className="inner-container" style={{maxWidth: '800px'}}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>Доставка и оплата</h1>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#3b82f6' }}>Способы доставки</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem' }}>Мы доставляем заказы по всей России с помощью курьерских служб и пунктов выдачи (СДЭК, Почта России, Boxberry).</p>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>Курьером до двери — от 350 ₽ (1-3 дня)</li>
            <li>Пункт выдачи заказов — от 150 ₽ (2-5 дней)</li>
            <li>Самовывоз со склада — бесплатно (г. Москва)</li>
          </ul>
        </div>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10b981' }}>Способы оплаты</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.6 }}>
            <li>Банковской картой онлайн (Visa, MasterCard, МИР)</li>
            <li>СБП (Система быстрых платежей)</li>
            <li>Наличными или картой при получении (только для курьерской доставки)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
