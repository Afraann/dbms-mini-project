import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        phone,
        email,
        address,
        password,
      });
      alert('User registered successfully');
      navigate('/login');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brown-700">
      <form onSubmit={handleSubmit} className="flex flex-col w-90 p-4 border border-beige-300 rounded-md">
        <h2 className="mx-auto text-2xl font-bold mb-4 text-beige-300">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-10 w-full rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="h-10 w-full rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10 w-full rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
        <button type="submit" className="bg-beige-300 text-brown-700 font-bold py-2 px-4 rounded-md">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;