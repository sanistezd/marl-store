'use server';

import { OrderData, CartItem } from '@/types';

export async function processCheckout(orderData: OrderData, cartItems: CartItem[], totalPrice: number) {
  // In a real application, you'd save this to a database (e.g. Prisma + PostgreSQL)
  // And send a Telegram message via fetch to Telegram Bot API.

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8365838281:AAEhkMMdh_Y_TdzP31w6ZDB_NLvc6qMd6PA';
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-5068828394';

  const orderText = `
🛍 *Новый заказ!*
👤 *Клиент:* ${orderData.name}
📱 *Телефон:* ${orderData.phone}
📧 *Email:* ${orderData.email}
📍 *Город:* ${orderData.city}
🏠 *Адрес:* ${orderData.address}
🚚 *Доставка:* ${orderData.deliveryMethod}
💬 *Комментарий:* ${orderData.comment || 'Нет'}

📦 *Товары:*
${cartItems.map((item, i) => `${i + 1}. ${item.name} ${item.size ? `(Размер: ${item.size})` : ''} - ${item.quantity} шт. x ${item.price} ₽`).join('\n')}

💰 *ИТОГО:* ${totalPrice} ₽
  `;

  try {
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: orderText,
          parse_mode: 'Markdown',
        }),
      });
    } else {
      console.log('Telegram credentials missing, but order processed:', orderText);
    }
    
    // Simulate DB delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Заказ успешно оформлен' };
  } catch (error) {
    console.error('Checkout Error:', error);
    return { success: false, message: 'Ошибка при оформлении заказа' };
  }
}
