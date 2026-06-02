'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useRouter } from 'next/navigation';
import { ALL_PRODUCTS } from '@/data/products';

function FilterDropdown({ 
  label, 
  options, 
  selected, 
  onChange,
  alignRight

}: { 
  label: string; 
  options: string[]; 
  selected: string[]; 
  onChange: (selected: string[]) => void; 
  alignRight?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const toggle = (opt: string) => {
    setLocalSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  const apply = () => {
    onChange(localSelected);
    setIsOpen(false);
  };

  const reset = () => {
    setLocalSelected([]);
    onChange([]);
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: isOpen || selected.length > 0 ? '#111' : '#fff', 
          color: isOpen || selected.length > 0 ? '#fff' : '#111', 
          border: '1px solid ' + (isOpen || selected.length > 0 ? '#111' : '#e5e7eb'), 
          padding: '0.8rem 1.5rem', 
          borderRadius: '30px', 
          fontWeight: 600, 
          fontSize: '0.95rem', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOpen ? '0 10px 25px -5px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.02)'
        }}
      >
        {label}
        {selected.length > 0 && (
          <span style={{ background: '#fff', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
            {selected.length}
          </span>
        )}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div className="mobile-dropdown-backdrop" onClick={() => setIsOpen(false)}></div>
          <div className="filter-dropdown-menu" style={{ 
            ...(alignRight ? { right: 0 } : { left: 0 }),
          }}>
          {options.map(opt => (
            <label 
              key={opt} 
              onClick={(e) => { e.preventDefault(); toggle(opt); }}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', cursor: 'pointer', borderRadius: '12px', transition: 'background 0.2s', background: localSelected.includes(opt) ? '#f9fafb' : 'transparent' }} 
              onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} 
              onMouseOut={e => e.currentTarget.style.background = localSelected.includes(opt) ? '#f9fafb' : 'transparent'}
            >
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: localSelected.includes(opt) ? 'none' : '2px solid #ddd', background: localSelected.includes(opt) ? '#111' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                {localSelected.includes(opt) && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
              </div>
              <span style={{ fontWeight: 600, color: '#111', fontSize: '0.95rem' }}>{opt}</span>
            </label>
          ))}
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={reset} style={{ background: 'none', border: 'none', color: '#888', fontWeight: 600, cursor: 'pointer' }}>Сбросить</button>
            <button onClick={apply} style={{ background: '#111', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Применить</button>
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function CatalogPage() {
  const { items, addItem } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Filters State
  const [categories, setCategories] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('По популярности');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filtering Logic
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (categories.length > 0 && !categories.includes(product.category)) return false;
    if (countries.length > 0 && !countries.includes(product.countryName)) return false;
    if (brands.length > 0 && !brands.includes(product.brand)) return false;
    
    if (prices.length > 0) {
      const priceMatched = prices.some(priceRange => {
        if (priceRange === 'До 500 ₽' && product.price <= 500) return true;
        if (priceRange === '500 - 1000 ₽' && product.price > 500 && product.price <= 1000) return true;
        if (priceRange === 'От 1000 ₽' && product.price > 1000) return true;
        return false;
      });
      if (!priceMatched) return false;
    }
    
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Сначала дешевые') return a.price - b.price;
    if (sortBy === 'Сначала дорогие') return b.price - a.price;
    // 'По популярности' / 'Сначала новинки' - just fallback to id or something
    if (sortBy === 'Сначала новинки') return Number(b.id) - Number(a.id);
    return 0;
  });

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
          <Link href="/register" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></Link>
          <Link href="/favorites" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></Link>
          <Link href="/cart" className="icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>{mounted && items.length > 0 && <span className="cart-badge">{items.length}</span>}</Link>
        </div>
      </header>
      
      {/* Modern Catalog Header & Filters */}
      <div className="catalog-header-container" style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
        <div className="catalog-header-inner">
          <h1 className="catalog-title">Каталог</h1>
          
          <div className="filters-wrapper">
            <div className="filters-group">
              <FilterDropdown label="Категория" options={['Напитки', 'Снеки', 'Сладости', 'Соусы']} selected={categories} onChange={setCategories} />
              <FilterDropdown label="Страна" options={['Россия', 'США', 'Южная Корея', 'Европа']} selected={countries} onChange={setCountries} />
              <FilterDropdown label="Бренд" options={['ZAVOD', 'EON', 'CHIKALAB', 'Dr Pepper', 'Samyang', 'Milka']} selected={brands} onChange={setBrands} alignRight={true} />
              <FilterDropdown label="Цена" options={['До 500 ₽', '500 - 1000 ₽', 'От 1000 ₽']} selected={prices} onChange={setPrices} alignRight={true} />
            </div>
            
            <div className="sort-group">
              <span className="sort-label">Сортировка:</span>
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option>По популярности</option>
                <option>Сначала новинки</option>
                <option>Сначала дешевые</option>
                <option>Сначала дорогие</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '3rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        {sortedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Ничего не найдено</h2>
            <p>Попробуйте изменить параметры фильтров</p>
          </div>
        ) : (
          <div className="products-row">
            {sortedProducts.map((product) => {
              const favored = mounted && isFavorite(product.id);
              return (
                <div className="product-item" key={product.id} onClick={() => router.push('/product/' + product.id)} style={{ cursor: 'pointer', background: '#fff', padding: '1.5rem', border: '1px solid #eee', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.1)'; }} onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <button 
                    className="heart-btn" 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product as any); }}
                    style={{ color: favored ? '#ef4444' : '#ccc', transition: 'color 0.2s' }} 
                    onMouseOver={e => !favored && (e.currentTarget.style.color = '#ef4444')} 
                    onMouseOut={e => !favored && (e.currentTarget.style.color = '#ccc')}
                  >
                    {favored ? '❤️' : '♡'}
                  </button>
                  <div className="prod-img-wrapper">
                    <img src={product.image} className="prod-img" alt={product.name} />
                  </div>
                  <div className="prod-title" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{product.name}</div>
                  <div className="prod-cat" style={{ color: '#888' }}>{product.countryName} • {product.category}</div>
                  <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push('/product/' + product.id); }} style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', marginTop: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Подробнее &#9432;</button>
                  <div className="prod-footer" style={{ marginTop: 'auto' }}>
                    <span className="prod-price" style={{ fontSize: '1.3rem' }}>{product.price} &#8381;</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        });
                      }}
                      className="btn-cart" 
                      style={{ padding: '0.6rem 1.2rem', borderRadius: '12px' }}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .catalog-header-container { padding: 3rem 4rem 2rem; }
        .catalog-header-inner { max-width: 1400px; margin: 0 auto; }
        .catalog-title { font-size: 3.5rem; font-weight: 800; margin-bottom: 2rem; letter-spacing: -1px; }
        
        .filters-wrapper { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .filters-group { display: flex; gap: 0.75rem; flex-wrap: wrap; flex: 1; }
        .sort-group { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .sort-label { color: #888; font-weight: 600; white-space: nowrap; }
        .sort-select { padding: 0.8rem 1.5rem; border-radius: 30px; border: none; background: #f2f3f7; font-weight: 600; font-size: 0.95rem; outline: none; cursor: pointer; }
        
        .filter-dropdown-menu {
          position: absolute;
          top: calc(100% + 0.75rem);
          background: #fff;
          min-width: 260px;
          border-radius: 20px;
          box-shadow: 0 20px 50px -10px rgba(0,0,0,0.15);
          padding: 1.25rem;
          z-index: 50;
          border: 1px solid #f0f0f0;
          animation: fadeInUp 0.2s ease-out;
        }

        .mobile-dropdown-backdrop {
          display: none;
        }

        @media (max-width: 768px) {
          .catalog-header-container { padding: 2rem 1.5rem 1.5rem; }
          .catalog-title { font-size: 2.5rem; margin-bottom: 1.5rem; }
          .filters-wrapper { flex-direction: column; align-items: stretch; gap: 1.5rem; }
          .filters-group { justify-content: flex-start; }
          .sort-group { justify-content: space-between; width: 100%; border-top: 1px solid #eee; padding-top: 1.5rem; }
          
          .mobile-dropdown-backdrop {
            display: block;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            backdrop-filter: blur(2px);
          }
          
          .filter-dropdown-menu {
            position: fixed !important;
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            border-radius: 24px 24px 0 0 !important;
            z-index: 1000 !important;
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
            padding-bottom: 3rem !important; /* Extra padding for safe area */
          }
          
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        }
      `}} />
    </div>
  );
}
