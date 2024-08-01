// client/src/components/AccountPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Update the import statement
import '../styles/tailwind.css'; // Import the stylesheet
import { useNavigate } from 'react-router-dom';


function AccountPage() {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.id; // Assuming 'id' is the key for user ID in your JWT
          const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleTrackOrders = () => {
    navigate('/track-order'); // Navigate to TrackOrderPage
  };

  return (
    <div className="main container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg h-400 w-400">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-20 m-20">
        <div className="flex items-center py-2">
          <span className="text-lg font-medium text-gray-700 mr-2">Username:</span>
          <span className="text-lg text-gray-600">{userDetails.username}</span>
        </div>

        <div className="flex items-center py-2">
          <span className="text-lg font-medium text-gray-700 mr-2">Phone:</span>
          <span className="text-lg text-gray-600">{userDetails.phone}</span>
        </div>

        <div className="flex items-center py-2">
          <span className="text-lg font-medium text-gray-700 mr-2">Email:</span>
          <span className="text-lg text-gray-600">{userDetails.email}</span>
        </div>

        <div className="flex items-center py-2">
          <span className="text-lg font-medium text-gray-700 mr-2">Address:</span>
          <span className="text-lg text-gray-600">{userDetails.address}</span>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={handleTrackOrders}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Track Orders
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
