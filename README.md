# Ecommerce-backend-assignment

# 🛒 Simple E-commerce API — Backend Assignment for AdaptNXT

## 👨‍💻 Developed by
**Basappagari Mukesh**  
Role: Backend Developer Intern Applicant

---

## 📌 Project Overview

A simple e-commerce REST API built with **Node.js, Express, MongoDB**, and **JWT Authentication**.  
Includes full **role-based access** (Admin/Customer), and optional frontend to interact with APIs.

---

## 🚀 Features Implemented

### 🔐 User Roles & Authentication
- JWT-based login & registration
- Role-based access control (Admin vs Customer)

### 🛍️ Product Management
- Admin: Create, Update, Delete Products
- All Users: View products
- Optional: Search by name/category, pagination

### 🛒 Cart Operations (Customer)
- Add to cart
- View cart
- Update quantity
- Remove item

### 📦 Order Management
- Place order from cart
- View order history

### 💻 Frontend (Optional)
- Basic HTML page with:
  - Login form
  - Product search
  - Add to cart
  - Place order

---

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- JWT for secure access
- Basic HTML + JS (Frontend)

---

## 📁 Folder Structure



  ecommerce-api/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── frontend/
  │ └── index.html
  ├── .env (ignored)
  ├── .gitignore
  ├── server.js
  └── README.md


---

## 🧪 How to Run Locally

### 1. Clone Repo

```bash
git clone https://github.com/your-username/ecommerce-backend-assignment.git
cd ecommerce-backend-assignment


npm install


create .env file

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret


# Run the server
npm run dev



