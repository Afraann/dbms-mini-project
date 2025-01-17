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
    <div className="bg-brown-300 p-4 rounded-md shadow-md"> {/* Brown background */}
      <h1>Cart Page</h1>
      {cart.items.length === 0 ? (
        <p className="text-center text-brown-700">Your cart is empty!</p>
      ) : (
        <div>
          {cart.items.map(({ itemId, quantity }) => (
            <div key={itemId._id} className="flex items-center justify-between border-b border-brown-200 py-2">
              <div>
                <h2 className="text-brown-700">{itemId.name}</h2>
                <p className="text-brown-600">Price: Rs{itemId.price.toFixed(2)}</p>
                <p className="text-brown-600">Quantity: {quantity}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(itemId._id)} className="bg-brown-700 hover:bg-beige-700 text-white font-bold py-1 px-4 rounded-md">
                Remove from Cart
              </button>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <h3 className="text-brown-700">Total Price: Rs{totalPrice.toFixed(2)}</h3>
            <button onClick={handleProceedToPay} className="bg-brown-700 hover:bg-beige-700 text-white font-bold py-2 px-4 rounded-md">
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
