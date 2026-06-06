'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCartStore } from '@/store/useCartStore';
import { ALL_PRODUCTS } from '@/data/products';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  
  const cartStore = useCartStore();
  const { toggleFavorite, isFavorite, items: favoriteItems } = useFavoritesStore();

  const cartCount = cartStore.items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: any) => {
    cartStore.addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    });
    setIsCartOpen(true);
  };

  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = activeCountry ? (
      activeCountry === 'ru' ? p.country === 'ru' :
      activeCountry === 'asia' ? ['kr', 'jp', 'cn'].includes(p.country) :
      activeCountry === 'west' ? ['us', 'eu'].includes(p.country) : true
    ) : true;
    return matchesSearch && matchesCountry;
  });

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.scrollTo({ top: document.querySelector('.products-row')?.getBoundingClientRect().top, behavior: 'smooth' });
    }
  };


  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Ваша корзина</h2>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-body">
          {cartStore.items.length === 0 ? (
            <div style={{color: '#888', textAlign: 'center', marginTop: '2rem'}}>Корзина пуста</div>
          ) : (
            cartStore.items.map((item) => (
                <div key={item.id} className="cart-item" style={{ position: 'relative' }}>
                  <img src={item.image} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-title" style={{ paddingRight: '20px' }}>{item.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button onClick={() => cartStore.updateQuantity(item.id, item.quantity - 1, item.size)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                      <span style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>{item.quantity}</span>
                      <button onClick={() => cartStore.updateQuantity(item.id, item.quantity + 1, item.size)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                      <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: '#fff' }}>{item.price * item.quantity} ₽</span>
                    </div>
                  </div>
                  <button onClick={() => cartStore.removeItem(item.id, item.size)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>&times;</button>
                </div>
            ))
          )}
        </div>
        {cartStore.items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
               <span>Итого:</span>
               <span>{cartStore.getTotalPrice()} ₽</span>
            </div>
            <Link href="/cart" style={{textDecoration: 'none'}}>
               <button className="checkout-btn">Оформить заказ</button>
            </Link>
          </div>
        )}
      </div>

      <div className="top-section">
        <header className="header">
          <Link href="/" className="logo-area" style={{ textDecoration: 'none', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" fill="white" className="logo-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
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
              <input 
                type="text" 
                placeholder="Поиск товаров (введите и нажмите Enter)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{cursor:'pointer'}} onClick={() => handleSearchKey({key: 'Enter'} as any)}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <nav className="header-nav">
            <Link href="/about">О нас</Link>
            <Link href="/delivery">Доставка</Link>
            <Link href="/brands">Брендам<span className="nav-dot"></span></Link>
          </nav>

          <div className="header-actions">
            <Link href="/profile" className="icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </Link>
            <Link href="/favorites" className="icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill={favoriteItems.length > 0 ? '#ef4444' : 'none'} stroke={favoriteItems.length > 0 ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </Link>
            <button className="icon-btn" onClick={() => setIsCartOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Интересные товары<br/>
              со всего мира<br/>
              и отборные российские<br/>
              бренды
            </h1>
            <p className="hero-subtitle">
              Редкие новинки, лимитки и качественные товары, которых нет в обычных магазинах.
            </p>
            <Link href="/catalog" className="hero-btn" style={{ textDecoration: 'none', display: 'inline-flex', width: 'fit-content' }}>
              Перейти в каталог
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:'0.75rem'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          
          <div className="hero-images-wrapper">
            <div className="hero-main-image"></div>
          </div>
        </section>
      </div>

      <div className="main-content">
        <div className="categories-grid">
          <div className="category-header-card">
            <div className="section-title-col">
              <h2>Товары<br/>по странам</h2>
              <Link href="/catalog" className="section-link">Смотреть все &rarr;</Link>
            </div>
          </div>
          
          <div className="category-card" style={activeCountry === 'ru' ? {boxShadow: '0 0 0 2px #3b82f6'} : {}} onClick={() => setActiveCountry(activeCountry === 'ru' ? null : 'ru')}>
            <img src="/shark_mascot.png" alt="Shark" className="cat-mascot" />
            <div className="cat-info">
              <h3>Россия</h3>
              <p>Отечественные<br/>товары</p>
            </div>
            <div className="cat-arrow">&rarr;</div>
          </div>

          <div className="category-card" style={activeCountry === 'asia' ? { background: '#251b22', boxShadow: '0 0 0 2px #3b82f6' } : { background: '#251b22' }} onClick={() => setActiveCountry(activeCountry === 'asia' ? null : 'asia')}>
            <img src="/shark_mascot.png" alt="Shark" className="cat-mascot" style={{ filter: 'hue-rotate(270deg)' }} />
            <div className="cat-info">
              <h3>Азия</h3>
              <p>Азиатские<br/>товары</p>
            </div>
            <div className="cat-arrow">&rarr;</div>
          </div>

          <div className="category-card" style={activeCountry === 'west' ? { background: '#1c222b', boxShadow: '0 0 0 2px #3b82f6' } : { background: '#1c222b' }} onClick={() => setActiveCountry(activeCountry === 'west' ? null : 'west')}>
            <img src="/shark_mascot.png" alt="Shark" className="cat-mascot" style={{ filter: 'hue-rotate(90deg)' }} />
            <div className="cat-info">
              <h3>США и Европа</h3>
              <p>Западные<br/>товары</p>
            </div>
            <div className="cat-arrow">&rarr;</div>
          </div>
        </div>

        <div className="products-header">
          <h2>{searchQuery ? `Результаты поиска: ${searchQuery}` : activeCountry ? `Категория: ${activeCountry.toUpperCase()}` : 'Новинки'}</h2>
          <div className="carousel-nav">
            <button onClick={() => scrollCarousel('left')}>&lt;</button>
            <button onClick={() => scrollCarousel('right')}>&gt;</button>
          </div>
        </div>

        <div className="products-carousel" ref={carouselRef}>
           {filteredProducts.length > 0 ? filteredProducts.map(product => {
             const favored = isFavorite(product.id);
             return (
               <div className="product-item" key={product.id} onClick={() => router.push('/product/' + product.id)} style={{ cursor: 'pointer' }}>
                 <button 
                   className="heart-btn" 
                   onClick={(e) => { e.stopPropagation(); toggleFavorite({ id: product.id, name: product.title, price: product.price, image: product.image }) }}
                   style={{ color: favored ? '#ef4444' : '#ccc', transition: 'color 0.2s' }}
                 >
                   {favored ? '❤️' : '♡'}
                 </button>
                 <div className="prod-img-wrapper">
                   <img src={product.image} className="prod-img" alt={product.title} />
                 </div>
                 <div className="prod-title">{product.title}</div>
                 <div className="prod-cat">{product.countryName}<br/>{product.categoryName}</div>
                 <button onClick={(e) => { e.stopPropagation(); router.push('/product/' + product.id); }} style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', marginTop: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Подробнее &#9432;</button>
                 <div className="prod-footer">
                   <span className="prod-price">{product.price} &#8381;</span>
                   <button className="btn-cart" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>В корзину</button>
                 </div>
               </div>
             )
           }) : (
            <div style={{gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: '#666'}}>
              Ничего не найдено.
            </div>
          )}
        </div>

        <div className="brands-grid">
          <div className="category-header-card" style={{justifyContent: 'flex-start'}}>
            <div className="section-title-col">
              <h2 style={{fontSize: '1.6rem'}}>Российские<br/>бренды</h2>
              <p style={{fontSize: '0.9rem', color: '#666', marginTop: '0.5rem', marginBottom: '1rem'}}>Поддерживаем новых производителей</p>
              <Link href="/brands" className="section-link" style={{color: '#111', border: '1px solid #ccc', padding: '0.5rem 1rem', borderRadius: '20px'}}>Смотреть все бренды &rarr;</Link>
            </div>
          </div>

          <div className="brand-card brand-1" onClick={() => setSearchQuery('EON')} style={{cursor:'pointer'}}>
            <h3>EON<br/>ENERGY</h3>
            <p>Современные энергетики с мощным составом для активной жизни</p>
            <Link href="/catalog?brand=eon" className="brand-btn" style={{textDecoration:'none', display:'inline-block'}}>Смотреть бренд</Link>
            <img src="https://images.unsplash.com/photo-1581636625402-29f2a01ef332?q=80&w=200&auto=format&fit=crop" className="brand-img" alt="EON" />
          </div>

          <div className="brand-card brand-2" onClick={() => setSearchQuery('ZAVOD')} style={{cursor:'pointer'}}>
            <h3>ZAVOD</h3>
            <p>Натуральные лимонады и напитки на каждый день</p>
            <Link href="/catalog?brand=zavod" className="brand-btn" style={{textDecoration:'none', display:'inline-block'}}>Смотреть бренд</Link>
            <img src="/product_russia_kvas.png" className="brand-img" alt="ZAVOD" />
          </div>

          <div className="brand-card brand-3" onClick={() => setSearchQuery('CHIKALAB')} style={{cursor:'pointer'}}>
            <h3>CHIKALAB</h3>
            <p>Полезные сладости и перекусы без лишнего</p>
            <Link href="/catalog?brand=chikalab" className="brand-btn" style={{textDecoration:'none', display:'inline-block'}}>Смотреть бренд</Link>
          </div>

          <div className="brand-card brand-4" onClick={() => setSearchQuery('СОУС')} style={{cursor:'pointer'}}>
            <h3 style={{color: '#ef4444'}}>НЕ ПРОСТО<br/>СОУС</h3>
            <p>Авторские соусы для тех, кто любит вкусную еду</p>
            <Link href="/catalog?brand=sous" className="brand-btn" style={{textDecoration:'none', display:'inline-block'}}>Смотреть бренд</Link>
          </div>
        </div>
      </div>
    </>
  );
}
