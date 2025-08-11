import { createContext, useState, PropsWithChildren } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
};

export type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 59.99,
      originalPrice: 79.99,
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
      quantity: 1,
    },
  ]);

  const addToCart = (product: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value: CartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


