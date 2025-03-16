import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product, CartItem } from '../../types';

const getCurrentUserId = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = users.find((user: any) => user.email === JSON.parse(localStorage.getItem('currentUser') || '{}').email);
  return currentUser ? currentUser.email : null;
};

const loadCartFromStorage = (): CartItem[] => {
  const userId = getCurrentUserId();
  if (!userId) return [];
  const storedCart = localStorage.getItem(`cart_${userId}`);
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToStorage = (items: CartItem[]) => {
  const userId = getCurrentUserId();
  if (userId) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  total: loadCartFromStorage().reduce((sum, item) => sum + item.price * item.quantity, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart: (state) => {
      const loadedItems = loadCartFromStorage();
      state.items = loadedItems;
      state.total = loadedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      const userId = getCurrentUserId();
      state.items = [];
      state.total = 0;
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer; 