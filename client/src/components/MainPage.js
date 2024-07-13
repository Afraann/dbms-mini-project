// src/components/MainPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css'; // Create this CSS file for styling

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
    <div>
      <h1>Main Page</h1>
      <div className="items-container">
        {items.map((item) => (
          <Link key={item._id} to={`/item/${item._id}`} className="item-link">
            <div className="item-box">
              <h2>{item.name}</h2>
              <p>${item.price.toFixed(2)}</p>
              <img src={item.imageUrl} alt={item.name} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
