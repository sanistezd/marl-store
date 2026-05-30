export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  country?: string;
  brand?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string; // Optional: if products have sizes
}

export interface OrderData {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  deliveryMethod: 'cdek' | 'pochta' | 'courier' | 'pickup';
  comment?: string;
}
