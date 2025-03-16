import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { AppDispatch } from '../index';
import { initializeCart } from './cartSlice';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      const emailExists = existingUsers.some((user: User) => user.email === action.payload.email);
      if (emailExists) {
        state.error = 'Email already registered';
        return;
      }

      // Add new user to array
      existingUsers.push(action.payload);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Store current user
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('currentUser');
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const loginThunk = (credentials: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      dispatch(loginSuccess(user));
      dispatch(initializeCart());
    } else {
      const userExists = users.some((u: User) => u.email === credentials.email);
      dispatch(loginFailure(userExists ? 'Invalid credentials' : 'User not found'));
    }
  };
};

export const { register, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer; 