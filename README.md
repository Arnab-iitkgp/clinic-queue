# 🏥 QueueMate - Real-Time Token Queue System

QueueMate is a real-time, role-based token queue management system designed for use cases like hospitals, clinics, or service centers. Built with the **MERN stack** and **Socket.IO**, it supports **live queue updates**, **receptionist/admin roles**, and a modern, clean UI.

---

## 🚀 Features

- 🔁 **Real-time Token Updates** (via WebSocket/Socket.IO)
- 🧑‍⚕️ **Receptionist Panel** – generate and call patient tokens with name input
- 🛡 **Admin Panel** – reset queue, manage dashboard 
- 👥 **Role-Based Access** – receptionist vs admin functionality
- 💾 Backend powered by **MongoDB** for token persistence 
- 🎨 Frontend styled with **Tailwind CSS**

---

## 🛠️ Tech Stack

| Layer         | Tech             |
|---------------|------------------|
| Frontend      | React, Tailwind CSS |
| Backend       | Node.js, Express.js |
| Database      | MongoDB + Mongoose |
| Real-time     | Socket.IO         |
| Auth          | JWT, Admin Secret Key |

---

## 🧑‍💻 Local Setup Instructions

1. Clone the Repo

```bash
git clone https://github.com/arnab-iitkgp/queuemate.git
cd queuemate
```

2. Set up .env for the Backend
Create a file server/.env and fill it like this:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
ADMIN_SECRET=your_admin_creation_secret
JWT_SECRET=your_jwt_secret
```
Or refer to [backend/.env.example](backend/.env.example).


3. Install Dependencies

### Backend
```
cd backend
npm install
```
### Frontend

```
cd ../frontend
npm install
```
4. Run the App

### In backend folder

```npm run dev```

### In frontend folder

```npm run dev```

## 📂 Folder Structure
```
queuemate/
├── backend/           # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env
│   └── .env.example
├── frontend/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
├── .gitignore
├── README.md
```
---
## 📌 Upcoming Features

🔁 Recall last token feature

📊 Admin dashboard with stats

💾 Token queue persistence and recovery

We welcome contributions! Open a PR or issue to get started.

### Maintainer

- [Arnab Chakraborty](https://github.com/arnab-iitkgp)
