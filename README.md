# 🛒 Ecommerce Backend API

A complete **Node.js + Express + MongoDB** backend for an eCommerce platform with **User, Seller, Product, Order, and Payment (Razorpay) integration**.

---

## 🚀 Features

* 🔐 Authentication (User & Seller)
* 👤 User Profile & Address Management
* 🛍️ Product Management (CRUD + Variants + Images)
* 🛒 Cart System & Checkout Flow
* 📦 Order Management
* 💳 Razorpay Payment Integration
* 🔍 Search & Filter Products
* 📊 Seller Dashboard (Products & Orders)
* 📄 Swagger API Documentation

---

## 🧠 Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose)
* Authentication: JWT + Cookies
* Payment: Razorpay
* Documentation: Swagger UI

---

## 📁 Project Structure

```
Backend/
│
├── controllers/
├── routes/
├── models/
├── middlewares/
├── services/
├── utils/
├── config/
├── public/
│
├── index.js
├── .env
└── package.json
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd Backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in root:

```env
PORT=8000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
BASE_URL=http://localhost:8000
```

---

## ▶️ Run Server

```bash
npm start
```

Server will run on:

```
http://localhost:8000
```

---

## 📄 API Documentation (Swagger)

```
http://localhost:8000/api-docs
```

👉 After deployment (Render):

```
https://your-app-name.onrender.com/api-docs
```

---

## 🔗 API Endpoints

### 🔐 Auth

* `POST /auth/signup`
* `POST /auth/login`
* `POST /auth/logout`

### 👤 User

* `GET /user/verify`
* `GET /user/cart`
* `POST /user/cart`
* `DELETE /user/cart/:productId`
* `POST /user/address`
* `DELETE /user/address/:id`

### 🏪 Seller

* `POST /auth/seller/signup`
* `POST /auth/seller/login`
* `GET /seller/products`
* `GET /seller/orders`

### 🛍️ Product

* `GET /product/:id`
* `GET /product/type/:type`
* `GET /product/related/:type/:id`
* `GET /product/search`
* `POST /product/sell`

### 📦 Order

* `POST /order/order`
* `GET /order/myOrders`

### 💳 Payment

* `POST /payment/payment`
* `POST /payment/verify`

---

## 🔍 Search & Filter Example

```
GET /product/search?keyword=shirt&minPrice=500&maxPrice=2000&sort=price
```

---

## 🛠️ Deployment

Deploy easily on **Render**:

1. Push code to GitHub
2. Create Web Service on Render
3. Add environment variables
4. Deploy 🚀

---

## 👨‍💻 Author

**Yuvraj Khatri**

---

## ⭐ Contribution

Feel free to fork, improve, and submit PRs!

---

## 📜 License

This project is licensed under the MIT License.
