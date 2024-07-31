// src/components/ItemPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [showQuantity, setShowQuantity] = useState(false);

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>Rs{item.price.toFixed(2)}</p>
      <img src={item.imageUrl} alt={item.name} />
      <p>{item.description}</p>
      {showQuantity ? (
        <div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
          <button onClick={handleAddToCart}>Add</button>
        </div>
      ) : (
        <button onClick={() => setShowQuantity(true)}>Add to Cart</button>
      )}
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ItemPage;
