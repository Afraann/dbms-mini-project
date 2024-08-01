import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header className="bg-brown-700 text-beige-100 p-4 flex justify-between items-center">
        <div className="flex space-x-4 ml-auto">
          <Link to="/login" className="text-beige-100 hover:text-beige-300 px-4 py-2 border border-beige-100 rounded">Login</Link>
          <Link to="/register" className="text-beige-100 hover:text-beige-300 px-4 py-2 border border-beige-100 rounded">Register</Link>
        </div>
      </header>
      <main className="p-8 bg-beige-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-20 text-6xl font-bold mb-4 text-brown-700 text-center absolute top-32">Welcome to chocofete</h1>
        <p className="p-40 text-lg text-brown-600 text-center mt-2">
          Chocolate is one of the most popular food types and flavors in the world, and many foodstuffs involving chocolate exist, particularly desserts, including cakes, pudding, mousse, chocolate brownies, and chocolate chip cookies. Many candies are filled with or coated with sweetened chocolate.
        </p>
      </main>
    </div>
  );
};

export default HomePage;