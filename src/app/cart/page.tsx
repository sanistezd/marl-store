'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { processCheckout } from '@/actions/checkout';
import { OrderData } from '@/types';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email'),
  city: z.string().min(2, 'Укажите город'),
  address: z.string().min(5, 'Укажите полный адрес'),
  deliveryMethod: z.enum(['cdek', 'pochta', 'courier', 'pickup']),
  comment: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: 'cdek',
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const result = await processCheckout(data as OrderData, items, getTotalPrice());
      if (result.success) {
        setOrderSuccess(true);
        clearCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при оформлении заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  if (orderSuccess) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <div style={{ width: '120px', height: '120px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          <CheckCircle size={64} color="#22c55e" />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-1px' }}>Заказ успешно оформлен!</h1>
        <p style={{ color: '#888', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '600px', marginBottom: '3rem' }}>
          Мы получили вашу заявку. В ближайшее время наш менеджер свяжется с вами для подтверждения заказа и уточнения деталей оплаты.
        </p>
        <Link href="/catalog" style={{ textDecoration: 'none', background: '#fff', color: '#000', padding: '1.2rem 3rem', borderRadius: '100px', fontSize: '1.2rem', fontWeight: 700, transition: 'all 0.2s', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}>
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Header is static for now, in a real app it's in Layout, but keeping the existing structure */}
      <header className="header" style={{ background: '#0a0a0a', borderBottom: '1px solid #222' }}>
        <Link href="/" className="logo-area" style={{ textDecoration: 'none', color: '#fff' }}>
          <svg viewBox="0 0 24 24" fill="white" className="logo-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
          <div>
            <div style={{ lineHeight: 1 }}>SHARKET</div>
            <div style={{ fontSize: '0.6rem', color: '#888' }}>FOOD & DRINKS</div>
          </div>
        </Link>
        <div className="header-center">
          <Link href="/catalog" className="catalog-btn" style={{ textDecoration: 'none' }}>
            Каталог
          </Link>
        </div>
        <div className="header-actions">
          <Link href="/cart" className="icon-btn" style={{ position: 'relative' }}>
            <ShoppingBag width="24" height="24" />
            {items.length > 0 && (
              <span className="cart-badge">{items.length}</span>
            )}
          </Link>
        </div>
      </header>

      <div className="inner-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Оформление заказа</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <ShoppingBag style={{ width: '64px', height: '64px', margin: '0 auto 2rem', color: '#444' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Ваша корзина пуста</h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Перейдите в каталог, чтобы добавить товары</p>
            <Link href="/catalog" style={{ display: 'inline-block', padding: '1rem 2rem', background: '#fff', color: '#000', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="cart-layout" style={{ gap: '2rem', alignItems: 'start' }}>
            <div className="cart-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Cart Items Section */}
              <div className="checkout-section">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShoppingBag size={24} /> Ваши товары
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {items.map((item) => (
                    <div key={item.id + (item.size || '')} className="cart-item-row">
                      <div className="cart-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>IMG</div>
                        )}
                      </div>

                      <div className="cart-item-details">
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h3>
                        {item.size && <p style={{ fontSize: '0.9rem', color: '#888' }}>Размер: {item.size}</p>}
                        <p style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.5rem' }}>{item.price} ₽</p>
                      </div>

                      <div className="cart-item-actions">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#1a1a1a', padding: '0.5rem', borderRadius: '8px' }}>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}><Minus size={16} /></button>
                          <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}><Plus size={16} /></button>
                        </div>

                        <button type="button" onClick={() => removeItem(item.id, item.size)} className="cart-item-remove">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form Section */}
              <div className="checkout-section">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Данные доставки</h2>

                <div className="form-grid" style={{ marginBottom: '1rem' }}>
                  <div>
                    <input {...register('name')} type="text" placeholder="Имя и Фамилия" style={{ width: '100%', padding: '1rem', background: '#1a1a1a', border: errors.name ? '1px solid #ef4444' : '1px solid #333', color: '#fff', borderRadius: '12px', outline: 'none' }} />
                    {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.name.message}</span>}
                  </div>
                  <div>
                    <input {...register('phone')} type="tel" placeholder="Телефон" style={{ width: '100%', padding: '1rem', background: '#1a1a1a', border: errors.phone ? '1px solid #ef4444' : '1px solid #333', color: '#fff', borderRadius: '12px', outline: 'none' }} />
                    {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone.message}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <input {...register('email')} type="email" placeholder="Email" style={{ width: '100%', padding: '1rem', background: '#1a1a1a', border: errors.email ? '1px solid #ef4444' : '1px solid #333', color: '#fff', borderRadius: '12px', outline: 'none' }} />
                  {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.email.message}</span>}
                </div>

                <div className="form-grid-address" style={{ marginBottom: '1rem' }}>
                  <div>
                    <input {...register('city')} type="text" placeholder="Город" style={{ width: '100%', padding: '1rem', background: '#1a1a1a', border: errors.city ? '1px solid #ef4444' : '1px solid #333', color: '#fff', borderRadius: '12px', outline: 'none' }} />
                    {errors.city && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.city.message}</span>}
                  </div>
                  <div>
                    <input {...register('address')} type="text" placeholder="Полный адрес (улица, дом, кв/офис)" style={{ width: '100%', padding: '1rem', background: '#1a1a1a', border: errors.address ? '1px solid #ef4444' : '1px solid #333', color: '#fff', borderRadius: '12px', outline: 'none' }} />
                    {errors.address && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.address.message}</span>}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888', fontSize: '0.9rem' }}>Способ доставки</label>
                  <select {...register('deliveryMethod')} style={{ width: '100%', padding: '1rem', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '12px', outline: 'none', appearance: 'none' }}>
                    <option value="cdek">СДЭК</option>
                    <option value="pochta">Почта РФ</option>
                    <option value="courier">Курьер (в пределах города)</option>
                    <option value="pickup">Самовывоз</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <textarea {...register('comment')} placeholder="Комментарий к заказу (необязательно)" rows={3} style={{ width: '100%', padding: '1rem', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '12px', outline: 'none', resize: 'vertical' }} />
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside style={{ position: 'sticky', top: '2rem' }}>
              <div style={{ background: '#111', padding: '2rem', borderRadius: '20px', border: '1px solid #222' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Итого</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#888' }}>
                  <span>Товары ({items.length})</span>
                  <span style={{ color: '#fff' }}>{getTotalPrice()} ₽</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #333', color: '#888' }}>
                  <span>Доставка</span>
                  <span style={{ color: '#fff' }}>По тарифам ТК</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800 }}>
                  <span>К оплате</span>
                  <span>{getTotalPrice()} ₽</span>
                </div>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.85rem', color: '#888', lineHeight: '1.4' }}>
                  Оплата производится при получении или переводом на карту после подтверждения заказа менеджером.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: 'opacity 0.2s'
                  }}
                >
                  {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                  {!isSubmitting && <ArrowRight size={20} />}
                </button>
              </div>
            </aside>
          </form>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-grid-address {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 1rem;
        }

        .cart-item-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #222;
        }
        .cart-item-image {
          width: 80px;
          height: 80px;
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cart-item-details {
          flex: 1;
        }
        .cart-item-actions {
          display: flex;
          align-items: center;
        }
        .cart-item-remove {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 0.5rem;
          margin-left: 0.5rem;
        }
        .checkout-section {
          background: #111;
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid #222;
        }
        
        @media (max-width: 900px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
          .form-grid, .form-grid-address {
            grid-template-columns: 1fr !important;
          }
          .inner-container {
            padding: 1rem !important;
          }
        }

        @media (max-width: 500px) {
          .cart-item-row {
            flex-wrap: wrap;
            gap: 1rem;
          }
          .cart-item-image {
            width: 60px;
            height: 60px;
          }
          .cart-item-details {
            min-width: 200px;
          }
          .cart-item-actions {
            width: 100%;
            justify-content: space-between;
            margin-top: 0.5rem;
          }
          .checkout-section {
            padding: 1.25rem;
          }
        }
      `}} />
    </div>
  );
}
