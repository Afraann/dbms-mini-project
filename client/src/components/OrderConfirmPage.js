// src/components/OrderConfirmPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function OrderConfirmPage() {
  const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [showDiscountedPrice, setShowDiscountedPrice] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { 'x-auth-token': token },
        });
        setCart(response.data);
        calculateTotalPrice(response.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0);
    setTotalPrice(total);
    setDiscountedPrice(total); 
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'DBMS50') {
      setDiscountedPrice(totalPrice * 0.5);
      setMessage('Coupon Code Applied');
      setShowDiscountedPrice(true); // Show only if code is valid
    } else {
      setDiscountedPrice(totalPrice); // Reset if invalid
      setMessage('Invalid Coupon Code');
      setShowDiscountedPrice(false); 
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const orderDetails = {
        items: cart.items,
        totalPrice,
        discountedPrice,
        couponCode,
        deliveryAddress,
      };
  
      const response = await axios.post('http://localhost:5000/api/order/create', orderDetails, {
        headers: { 'x-auth-token': token },
      });
  
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully!',
          text: 'Your order has been placed. You can track its progress on the order tracking page.'
        }).then(() => {
          navigate('/track-order');
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: 'Something went wrong. Please try again.'
      });
    }
  };  

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Confirmation</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cart.items.map(({ itemId, quantity }) => (
            <div key={itemId._id}>
              <h2>{itemId.name}</h2>
              <p>Price: Rs{itemId.price.toFixed(2)}</p>
              <p>Quantity: {quantity}</p>
            </div>
          ))}
          <h3>Total Price: Rs{totalPrice.toFixed(2)}</h3>

          {showDiscountedPrice && ( 
            <h3>Discounted Price: Rs{discountedPrice.toFixed(2)}</h3>
          )}

          <div>
            <label>Coupon Code:</label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
          </div>
          {message && <p>{message}</p>}

          <div>
            <label>Delivery Address:</label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>

          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmPage;