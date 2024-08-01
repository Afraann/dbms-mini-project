// src/components/TrackOrderPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TrackOrderPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/order', {
          headers: { 'x-auth-token': token },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div>
      <h1>Track Order Page</h1>
      {orders.map((order) => (
        <div key={order._id} className="order">
          <h2>Order ID: {order._id}</h2>
          <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
          <p>Delivery Address: {order.deliveryAddress}</p>
          <h3>Items:</h3>
          {order.items.map(({ itemId, quantity }) => (
            <div key={itemId._id}>
              <p>{itemId.name} - Quantity: {quantity}</p>
              <p>Price: Rs{itemId.price.toFixed(2)}</p>
            </div>
          ))}
          <h3>Total Price: Rs{order.totalPrice.toFixed(2)}</h3>
          {order.discountedPrice && <h3>Discounted Price: Rs{order.discountedPrice.toFixed(2)}</h3>}
        </div>
      ))}
    </div>
  );
}

export default TrackOrderPage;
