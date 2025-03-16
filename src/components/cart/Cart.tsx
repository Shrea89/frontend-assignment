import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <Grid container>
                <Grid item xs={4} sm={3}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 140,
                      objectFit: 'contain',
                      p: 2,
                    }}
                    image={item.image}
                    alt={item.title}
                  />
                </Grid>
                <Grid item xs={8} sm={9}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        sx={{ ml: 'auto' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="body1">Total:</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Box>
              <Button variant="contained" fullWidth>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 