# 📝 React_Todos

### Real-time Todo List Application | React | Node.js | Socket.io | Tailwind CSS | MongoDB

A sleek, responsive, and realtime Todo List app built with **React**, **Node.js**, **Express**, **Tailwind CSS**, **Socket.io**, and **MongoDB**.  
This app lets users add, edit, delete, and toggle todos with instant synchronization across all connected users and friendly toast notifications.

---

## 🚀 Features

- ✍️ **Add new todos effortlessly**  
- ✏️ **Edit todos inline or in a modal**  
- 🗑️ **Delete todos with confirmation**  
- ✅ **Toggle todo completion status**  
- 🌐 **Realtime updates across all users via Socket.io**  
- 🔔 **Instant toast notifications on all actions**  
- 📱 **Fully responsive design with Tailwind CSS**

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, React-toastify (for toasts)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Realtime:** Socket.io  
- **Notifications:** React-toastify

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/react_todos.git
    cd react_todos
    ```

2. **Install dependencies:**

    ```bash
    # Backend
    cd server
    npm install

    # Frontend
    cd ../client
    npm install
    ```

3. **Set up MongoDB:**

    Make sure you have MongoDB installed and running locally, or use a cloud service like MongoDB Atlas.

4. **Create a `.env` file in the `server` directory with your MongoDB connection string:**

    ```ini
    MONGO_URI=your_mongodb_connection_string
    ```

5. **Run the servers:**

    ```bash
    # Backend
    cd ../server
    npm start

    # Frontend
    cd ../client
    npm start
    ```

6. **Open the app in your browser:**

    ```
    http://localhost:3000
    ```

---

## 🔍 How It Works

- **Backend:** Express server powered with Socket.io and MongoDB manages todos and broadcasts realtime updates.  
- **Frontend:** React app listens to Socket.io events to update the todo list instantly across clients.  
- **Data:** Todos are persisted in MongoDB, providing reliable data storage and retrieval.  
- **Notifications:** React-toastify triggers instant feedback messages on todo actions like adding, updating, or deleting.

---


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the issues page.

---

## 📫 Contact

If you have any questions or want to connect, feel free to reach out:

- Email: vipulsangwan771@gmail.com  
- GitHub: [github.com/vipulsangwan771](https://github.com/vipulsangwan771)  
- LinkedIn: [linkedin.com/in/vipulsangwan771](https://linkedin.com/in/vipulsangwan771)

Thank you for checking out React_Todos! 🚀
