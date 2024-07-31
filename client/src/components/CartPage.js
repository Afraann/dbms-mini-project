// client/src/components/CartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            'x-auth-token': token,
          },
        });
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/cart/remove', {
        itemId,
      }, {
        headers: {
          'x-auth-token': token,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleProceedToPay = () => {
    navigate('/order-confirm');
  };

  if (!cart) {
    return <div>Your cart is empty</div>;
  }

  const totalPrice = cart.items.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0);

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.items.map(({ itemId, quantity }) => (
            <div key={itemId._id}>
              <h2>{itemId.name}</h2>
              <p>Price: Rs{itemId.price.toFixed(2)}</p>
              <p>Quantity: {quantity}</p>
              <button onClick={() => handleRemoveFromCart(itemId._id)}>Remove from Cart</button>
            </div>
          ))}
          <h3>Total Price: Rs{totalPrice.toFixed(2)}</h3>
          <button onClick={handleProceedToPay}>Proceed to Order Confirmation</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
