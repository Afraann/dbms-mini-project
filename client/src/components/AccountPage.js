// client/src/components/AccountPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Update the import statement

function AccountPage() {
  const [userDetails, setUserDetails] = useState({});

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

  return (
    <div>
      <h2>Account Details</h2>
      <p><strong>Username:</strong> {userDetails.username}</p>
      <p><strong>Phone:</strong> {userDetails.phone}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Address:</strong> {userDetails.address}</p>
    </div>
  );
}

export default AccountPage;
