# E-Commerce Website

## Description
This is a simple website built using the MERN stack (MongoDB, Express.js, React, and Node.js). The website includes user authentication, a login page, a registration page, and a main page.

## Latest Release
In here, I will be giving you all the info on what have been done to the project, and what are the changes incuded in the latest updates, as well as list of all updates.

-> v1.0
    This is the first release. In this version, all that's there is the basic pages, but it is connected to the backend.

## Features
- User Registration
- User Login
- Protected Main Page

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)

## Getting Started

### 1. Clone the Repository
Clone the repository to your local machine:

In your terminal-
git clone https://github.com/Afraann/dbms-mini-project.git
cd dbms-mini-project

### 2. Install Dependencies
Navigate to the 'server' directory and install the server-side dependencies:

In your terminal-
cd server
npm install

Navigate to the 'client' directory and install the client-side dependencies:
cd client
npm install

### 3. Set Up Environment Variables
Create a .env file in the server directory with the following content:

In your terminal-
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


## 4. Run the Application

### Start the Server

Navigate to the server directory and start the server:

In your terminal-
'''cd server
npm start'''

### Start the Client
In a new terminal, navigate to the client directory and start the React development server:

In your terminal-
cd client
npm start

The server will be running on http://localhost:5000 and the client on http://localhost:3000.

## Troubleshooting

### Module not found errors:
Ensure all dependencies are installed correctly and check the import paths in your code.

### Database connection issues:
Verify that your MongoDB connection string is correct and that MongoDB is running.

## Acknowledgments

    React
    Node.js
    Express.js
    MongoDB