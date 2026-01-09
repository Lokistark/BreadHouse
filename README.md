# 🍞 Bread House - Premium Food Delivery App

A full-stack e-commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project delivers a seamless food ordering experience with features like user authentication, persistent shopping cart, category filtering, and a secure checkout process.

![Bread House Banner](https://github.com/Lokistark/BreadHouse/blob/main/Screenshot%202026-01-05%20123727.png)

## 🚀 Features

### 👤 User Features
*   **Authentication**: Secure Register & Login using JWT (JSON Web Tokens).
*   **Product Discovery**: Browse food items with advanced filtering by category and dynamic search.
*   **Persistent Cart**: Shopping cart syncs across devices using MongoDB (Backend-driven cart).
*   **Checkout System**: Complete checkout flow with delivery details and simulated payment gateways (UPI, Wallet, COD).
*   **Order Tracking**: View order status and history in the User Profile.
*   **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.

### 🛡️ Admin Features
*   **Admin Dashboard**: Manage products and view all customer orders.
*   **Product Management**: Add, Edit, or Delete food items.
*   **Order Management**: Track and update order statuses.

## 🛠️ Tech Stack

### Frontend
*   **React.js**: Component-based UI architecture.
*   **Tailwind CSS**: Modern, utility-first styling for a premium look.
*   **Context API**: State management for user sessions and cart data.
*   **Lucide React**: Beautiful, consistent icons.
*   **Axios**: For making HTTP requests to the backend.

### Backend
*   **Node.js & Express.js**: RESTful API server.
*   **MongoDB & Mongoose**: NoSQL database for flexible data modeling (Users, Products, Orders, Cart).
*   **JWT (JSON Web Token)**: Secure stateless authentication.
*   **Bcrypt.js**: Password hashing for security.

## ⚙️ Installation & Run Locally

### Prerequisites
*   Node.js installed on your machine.
*   MongoDB Atlas connection string (or local MongoDB).

### 1. Clone the Repository
```bash
git clone https://github.com/Lokistark/BreadHouse.git
cd BreadHouse
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the Server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the React App:
```bash
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/products` | Fetch all products |
| **POST** | `/api/users/login` | Authenticate user & get token |
| **POST** | `/api/users/register` | Register a new account |
| **POST** | `/api/cart/add` | Add item to user's database cart |
| **GET** | `/api/orders/myorders` | Get logged-in user's order history |

## 📂 Project Structure

```
Bread House/
├── backend/            # Express Server, Models, Routes, Controllers
│   ├── config/         # DB Connection
│   ├── controllers/    # Logic for Products, Users, Orders, Cart
│   ├── data/           # Seeder Data
│   ├── middleware/     # Auth Middleware
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   └── server.js       # Entry Point
│
└── frontend/           # React Application
    ├── public/         # Static Assets
    └── src/
        ├── assets/     # Images & Icons
        ├── components/ # Reusable Components (Header, Footer, Cards)
        ├── context/    # Global State (StoreContext)
        ├── pages/      # Full Pages (Home, Cart, Checkout, etc.)
        └── App.jsx     # Main Component
```

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Created by Loki Stark*
