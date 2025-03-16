import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Box,
  Rating,
  CircularProgress,
  Paper,
} from '@mui/material';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => state.products.selectedProduct);
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading || !product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate('/products')}
        sx={{ mb: 4 }}
      >
        Back to Products
      </Button>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                sx={{
                  height: 400,
                  objectFit: 'contain',
                  p: 2,
                }}
                image={product.image}
                alt={product.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating.rate} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.rating.count} reviews)
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 3 }}
            >
              {product.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => dispatch(addToCart(product))}
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail; 