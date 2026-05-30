'use client';
import Link from 'next/link';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCartStore } from '@/store/useCartStore';
import { useState, useEffect } from 'react';

export default function FavoritesPage() {
  const { items: favoriteItems, toggleFavorite } = useFavoritesStore();
  const cartStore = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = cartStore.items.reduce((sum, item) => sum + item.quantity, 0);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#f2f3f7', color: '#111' }} />;

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
          <Link href="/favorites" className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={favoriteItems.length > 0 ? '#ef4444' : 'none'} stroke={favoriteItems.length > 0 ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </Link>
          <Link href="/cart" className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </header>
      
      <div className="inner-container">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Мое Избранное</h1>
        {favoriteItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Список избранного пуст</h2>
            <p style={{ marginBottom: '2rem' }}>Перейдите в каталог, чтобы добавить товары</p>
            <Link href="/catalog" style={{ padding: '0.8rem 1.5rem', background: '#111', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>В каталог</Link>
          </div>
        ) : (
          <div className="products-row">
             {favoriteItems.map((product) => (
                <div className="product-item" key={product.id} style={{ background: '#fff', padding: '1.5rem', border: '1px solid #eee' }}>
                  <button 
                    className="heart-btn" 
                    onClick={() => toggleFavorite(product)}
                    style={{ color: '#ef4444', transition: 'color 0.2s', fontSize: '1.2rem' }}
                  >
                    ❤️
                  </button>
                  <div className="prod-img-wrapper">
                    <img src={product.image} className="prod-img" alt={product.name} />
                  </div>
                  <div className="prod-title">{product.name}</div>
                  {product.category && <div className="prod-cat">{product.country || ''} • {product.category}</div>}
                  <div className="prod-footer" style={{ marginTop: '1.5rem' }}>
                    <span className="prod-price">{product.price} &#8381;</span>
                    <button 
                      className="btn-cart" 
                      onClick={() => cartStore.addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
