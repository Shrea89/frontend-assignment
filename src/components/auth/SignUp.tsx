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
  Paper,
  useTheme,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import backgroundImage from '../../assets/shop4.png';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUp: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
      navigate('/login');
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
              color: theme.palette.mode === 'light' ? '#FFFFF0' : '#ffffff',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Join Bazaar
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: theme.palette.mode === 'light' ? '#FFFFF0' : 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
            }}
          >
            Create your account today
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
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{
                backgroundColor: theme.palette.mode === 'light'
                  ? 'transparent'
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
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : '#ffffff',
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{
                backgroundColor: theme.palette.mode === 'light'
                  ? 'transparent'
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
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : '#ffffff',
                },
              }}
            />
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
                  ? 'transparent'
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
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : '#ffffff',
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
                      sx={{ color: theme.palette.mode === 'light' ? '#FFFFF0' : '#ffffff' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: theme.palette.mode === 'light'
                  ? 'transparent'
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
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : '#ffffff',
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
              Sign Up
            </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="body2" color={theme.palette.mode === 'light' ? '#FFFFF0' : 'text.secondary'}>
                Already have an account?{' '}
              </Typography>
              <Link
                href="/login"
                variant="body2"
                sx={{
                  ml: 1,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: theme.palette.mode === 'light' ? '#FFFFF0' : 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp; 