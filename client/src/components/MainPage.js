import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MainPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="p-20 flex flex-col items-center justify-center min-h-screen bg-brown-700"> {/* Brown background */}
      <h1 className="text-2xl font-bold mb-4 text-beige-300">Main Page</h1>
      <div className="items-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link key={item._id} to={`/item/${item._id}`} className="item-link">
            <div className="item-box bg-beige-100 p-4 rounded-md shadow-md"> {/* Beige item box */}
              <h2 className="text-brown-700">{item.name}</h2>
              <p className="text-brown-600">Rs{item.price.toFixed(2)}</p>
              <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded-md" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
