import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductsState } from '../../types';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
  categories: [],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const { setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer; 