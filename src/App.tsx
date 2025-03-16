import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ThemeProvider, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Badge, 
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme } from '@mui/material/styles';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import Cart from './components/cart/Cart';
import { RootState } from './store';
import { logout } from './store/slices/authSlice';
import { clearCart, initializeCart } from './store/slices/cartSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      dispatch(initializeCart());
    }
  }, [dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#B84000' : '#1E88E5',
            light: mode === 'light' ? '#D65108' : '#64B5F6',
            dark: mode === 'light' ? '#8B3000' : '#1565C0',
          },
          secondary: {
            main: mode === 'light' ? '#f50057' : '#f48fb1',
            light: mode === 'light' ? '#ff4081' : '#f8bbd0',
            dark: mode === 'light' ? '#c51162' : '#ec407a',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#000000',
            paper: mode === 'light' ? '#ffffff' : '#121212',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 500 },
          h2: { fontWeight: 500 },
          h3: { fontWeight: 500 },
          h4: { fontWeight: 500 },
          h5: { fontWeight: 500 },
          h6: { fontWeight: 500 },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === 'light' 
                  ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.4)',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#B84000' : '#000000',
                color: '#ffffff',
                boxShadow: mode === 'light'
                  ? '0 2px 8px rgba(184, 64, 0, 0.2)'
                  : '0 2px 8px rgba(0, 0, 0, 0.3)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="sticky">
          <Toolbar>
            <Typography 
              variant="h6" 
              component={Link}
              to="/"
              sx={{ 
                flexGrow: 1, 
                color: '#ffffff',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              E-Commerce Store
            </Typography>
            <IconButton 
              sx={{ 
                mr: 2,
                color: mode === 'light' ? '#ffffff' : '#1E88E5',
                backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(30, 136, 229, 0.1)',
                },
              }} 
              onClick={toggleColorMode} 
              title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                  Welcome, {user?.firstName}
                </Typography>
                <Button 
                  component={Link}
                  to="/products"
                  sx={{ 
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }} 
                >
                  Products
                </Button>
                <Button
                  component={Link}
                  to="/cart"
                  sx={{ 
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                  startIcon={
                    <Badge badgeContent={cartItems.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  }
                >
                  Cart
                </Button>
                <Button 
                  sx={{ 
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }} 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box>
                <Button 
                  component={Link}
                  to="/login"
                  sx={{ 
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }} 
                >
                  Login
                </Button>
                <Button 
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  sx={{ 
                    ml: 2,
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    '&:hover': {
                      borderColor: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ py: 3 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/products" />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default App;
