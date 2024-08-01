// src/components/TrackOrderPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/order/cancel`, { orderId }, {
        headers: { 'x-auth-token': token },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Order Canceled',
          text: 'Your order has been successfully canceled.',
        });
        setOrders(orders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Cancel Failed',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  if (orders.length === 0) {
    return <div className="text-center text-gray-700">No orders found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10 bg-beige-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-brown-600 mb-6">Track Order Page</h1>
      {orders.map((order) => (
        <div key={order._id} className="order mb-6 p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-brown-600">Order ID: {order._id}</h2>
          <p className="text-gray-700">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
          <p className="text-gray-700">Delivery Address: {order.deliveryAddress}</p>
          <h3 className="text-lg font-semibold text-brown-600">Items:</h3>
          {order.items.map(({ itemId, quantity }) => (
            <div key={itemId._id} className="mb-2">
              <p className="text-gray-700">{itemId.name} - Quantity: {quantity}</p>
              <p className="text-gray-700">Price: Rs{itemId.price.toFixed(2)}</p>
            </div>
          ))}
          <h3 className="text-lg font-semibold text-brown-600 mt-4">Total Price: Rs{order.totalPrice.toFixed(2)}</h3>
          {order.discountedPrice && (
            <h3 className="text-lg font-semibold text-green-600">Discounted Price: Rs{order.discountedPrice.toFixed(2)}</h3>
          )}
          <div className="mt-4 flex space-x-4">
            <button 
              onClick={() => handleCancelOrder(order._id)} 
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackOrderPage;
