'use client';
import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { ALL_PRODUCTS } from '@/data/products';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  
  const product = ALL_PRODUCTS.find(p => p.id === resolvedParams.id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>
        <h2>Товар не найден</h2>
        <button onClick={() => router.push('/catalog')} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Вернуться в каталог</button>
      </div>
    );
  }

  const favored = isFavorite(product.id);

  const handleAddToCart = () => {
    // Add multiple items if quantity > 1
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
    router.push('/cart');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
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
        </div>
        <div className="header-actions">
          <Link href="/favorites" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></Link>
          <Link href="/cart" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></Link>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#aaa', fontSize: '1rem', cursor: 'pointer', marginBottom: '2rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#aaa'}>
          &larr; Назад
        </button>

        <div className="product-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', background: '#121212', borderRadius: '24px', padding: '3rem', border: '1px solid #222' }}>
          <div className="product-image-container" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', minHeight: '400px', border: '1px solid #2a2a2a' }}>
            <img src={product.realImage || product.image} alt={product.name} style={{ width: '100%', height: '100%', maxHeight: '550px', objectFit: 'contain' }} />
            <button 
              className="heart-btn" 
              onClick={() => toggleFavorite({ id: product.id, name: product.name, price: product.price, image: product.image })}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: favored ? '#ef4444' : '#fff', transition: 'all 0.2s', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '1.5rem' }} 
            >
              {favored ? '❤️' : '♡'}
            </button>
          </div>

          <div className="product-info-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#888', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {product.countryName} • {product.category} • {product.brand}
            </div>
            
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>{product.name}</h1>
            
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '2rem' }}>
              {product.price} ₽
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 700, color: '#fff' }}>О товаре</h3>
              <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: '1.05rem' }}>
                {product.description}
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 700, color: '#fff' }}>Характеристики</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.characteristics?.map((char: string) => (
                  <span key={char} style={{ background: '#222', border: '1px solid #333', color: '#ccc', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto', borderTop: '1px solid #222', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#1a1a1a', borderRadius: '16px', padding: '0.5rem', border: '1px solid #333' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '40px', height: '40px', borderRadius: '12px', border: 'none', background: '#2a2a2a', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#333'} onMouseOut={e => e.currentTarget.style.background = '#2a2a2a'}>-</button>
                <span style={{ width: '50px', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ width: '40px', height: '40px', borderRadius: '12px', border: 'none', background: '#2a2a2a', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#333'} onMouseOut={e => e.currentTarget.style.background = '#2a2a2a'}>+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                style={{ flex: 1, background: '#fff', color: '#000', border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 30px -5px rgba(255,255,255,0.2)' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(255,255,255,0.3)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(255,255,255,0.2)'; }}
              >
                Добавить в корзину — {product.price * quantity} ₽
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .product-layout { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 2rem !important; }
          .product-image-container { max-height: 400px; }
        }
        @media (max-width: 500px) {
          .product-layout { padding: 1.5rem !important; border-radius: 16px !important; }
        }
      `}} />
    </div>
  );
}
