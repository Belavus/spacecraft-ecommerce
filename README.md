# Spacecraft E-Commerce 🚀

A full-stack e-commerce web application for spacecrafts, built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
The project demonstrates authentication, product management, order processing, real-time chat, and interactive data visualization with D3.js.

---

## ✨ Features
- User authentication with JWT (login/register).
- Browse spacecraft products with filtering and search.
- Shopping cart and order management.
- Admin panel for product and user management.
- Real-time chat with Socket.IO.
- Data visualization with **D3.js**.
- Responsive UI built with **Material-UI (MUI)**.

---

## 🛠 Tech Stack
**Frontend**
- React, React Router
- Material-UI
- Context API (Cart, Orders, Products, Users)
- Axios

**Backend**
- Node.js, Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO (chat)
- REST API

---

## 📂 Project Structure
```
spacecraft-ecommerce/
│
├── client/              # React frontend
│   └── src/
│       ├── components/  # UI components
│       ├── context/     # React Contexts
│       ├── pages/       # Pages (Home, Admin, Login, etc.)
│       └── services/    # ApiService.js
│
├── server/              # Express backend
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth and error handling
│   └── server.js        # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16)
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repo
```bash
git clone https://github.com/Belavus/spacecraft-ecommerce.git
cd spacecraft-ecommerce
```

#### 2. Setup server
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start server:
```bash
npm run dev   # with nodemon
# or
npm start
```

#### 3. Setup client
```bash
cd ../client
npm install
npm start
```

---

## 📡 API Endpoints (examples)
- `POST /api/auth/login` — User login
- `POST /api/auth/register` — User registration
- `GET /api/products` — Get all products
- `POST /api/products` — Add product (admin)
- `GET /api/orders` — Get all orders (admin)
- `POST /api/orders` — Create new order
