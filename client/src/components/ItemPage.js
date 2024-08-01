// src/components/ItemPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [showQuantityInput, setShowQuantityInput] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart/add', {
        itemId: id,
        quantity,
      }, {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessage('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart/remove', {
        itemId: id,
      }, {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessage('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (!item) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10 bg-beige-50">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <img src={item.imageUrl} alt={item.name} className="w-full md:w-1/2 rounded-lg shadow-md" />
        <div className="mt-4 md:mt-0">
          <h1 className="text-2xl font-bold text-brown-600 mb-2">{item.name}</h1>
          <p className="text-lg text-brown-500 mb-2">Rs{item.price.toFixed(2)}</p>
          <p className="mt-2 text-gray-700 mb-4">{item.description}</p>
          {showQuantityInput ? (
            <div className="mt-4 flex items-center space-x-4">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="border rounded p-2 w-16"
              />
              <button onClick={handleAddToCart} className="bg-brown-500 text-white py-2 px-4 rounded">
                Add
              </button>
            </div>
          ) : (
            <button onClick={() => setShowQuantityInput(true)} className="mt-4 bg-brown-500 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
          )}
          <div className="mt-4 flex space-x-4">
            <button onClick={handleRemoveFromCart} className="bg-brown-500 text-white py-2 px-4 rounded">
              Remove from Cart
            </button>
          </div>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
