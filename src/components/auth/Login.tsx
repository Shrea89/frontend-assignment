import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Link,
  Paper,
  useTheme,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginThunk } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store';
import backgroundImage from '../../assets/shop4.png';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const Login: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        py: 12,
        px: 3,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0)'
              : 'rgba(18, 18, 18, 0)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: theme.palette.mode === 'light' ? '#000000' : '#ffffff',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
            }}
          >
            Please sign in to continue
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: '100%',
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(0, 0, 0, 0.2)',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ color: theme.palette.mode === 'light' ? '#B84000' : '#ffffff' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(0, 0, 0, 0.2)',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: theme.palette.mode === 'light'
                  ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                  : '0 4px 12px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 6px 16px rgba(0, 0, 0, 0.12)'
                    : '0 6px 16px rgba(0, 0, 0, 0.4)',
                },
              }}
            >
              Sign In
            </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
              </Typography>
              <Link
                href="/signup"
                variant="body2"
                sx={{
                  ml: 1,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: theme.palette.mode === 'light' ? '#000000' : 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 