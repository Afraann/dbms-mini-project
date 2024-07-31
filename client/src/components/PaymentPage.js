// src/components/PaymentPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const [deliveryDate] = useState('Tomorrow, at 11:00 AM');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cartResponse = await fetch('/api/cart');
        const cartData = await cartResponse.json();
        setCartItems(cartData.items);

        const addressResponse = await fetch('/api/user/address');
        const addressData = await addressResponse.json();
        setUserAddress(addressData.address);
      } catch (error) {
        console.error('Error fetching cart or address:', error);
      }
    };

    fetchCartDetails();
  }, []);

  const handleOrderNow = async () => {
    try {
      const username = 'exampleUser'; // Replace with actual username from context or API
      const phoneNo = '9999999999'; // Replace with actual phone number

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          phoneNo,
          address: userAddress,
          items: cartItems.map(item => ({
            itemId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          deliveryDate,
        }),
      });

      const result = await response.json();

      if (result._id) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate.push('/orders');
        }, 1000);
      } else {
        throw new Error('Order creation failed');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Order submission failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <div>
        <h2>Items in Cart</h2>
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <li key={item.id}>
                {item.name} - {item.quantity} x {item.price} INR
              </li>
            ))
          ) : (
            <li>No items in cart</li>
          )}
        </ul>
      </div>
      <div>
        <h2>User Address</h2>
        <p>{userAddress || 'Address not available'}</p>
      </div>
      <div>
        <h2>Delivery Details</h2>
        <p>{deliveryDate}</p>
      </div>
      <button onClick={handleOrderNow}>Order Now</button>
      {showPopup && <div className="popup">Order Confirmed</div>}
    </div>
  );
};

export default PaymentPage;
