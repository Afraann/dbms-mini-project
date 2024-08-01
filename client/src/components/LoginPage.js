import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/mainpage');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brown-700">
      <form onSubmit={handleSubmit} className="flex flex-col w-90 p-4 border border-beige-300 rounded-md"> {/* Green border for the div */}
        <h2 className="mx-auto text-2xl font-bold mb-4 text-beige-300">Login</h2>
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="h-10 w-full rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-10 w-full rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="bg-beige-300 text-brown-700 font-bold py-2 px-4 rounded-md">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage