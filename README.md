# 📝 TaskMaster – Personalized Task Management App

TaskMaster is a **personalized task management web application** built using **Node.js, Express.js, MongoDB, and EJS**, following the **MVC architecture**.

Each user has **secure access to their own tasks and profile**, ensuring complete data privacy.

---

## 🚀 Live Demo

🔗(https://taskmaster-app-soz2.onrender.com/)

**🛠 Tech Stack**

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- MVC Architecture
- Multer (Profile Image Upload)
- Stitch (Frontend UI Design)

---

**Key Features**

- User Authentication & Protected Routes
- Personalized User Access (private tasks)
- Create, Update, Edit & Delete Tasks
- Task Priority & Difficulty Levels
- Task Status (Pending, In Progress, Completed)
- Due Date Management
- User Profile View & Update
- Profile Photo Upload (Multer)

---

## 📂 Project Structure

taskmaster/
│
├── models/
│ ├── User.js
│ └── Task.js
│
├── controllers/
│ ├── authController.js
│ ├── taskController.js
│ └── profileController.js
│
├── routes/
│ ├── authRoutes.js
│ ├── taskRoutes.js
│ └── profileRoutes.js
│
├── middleware/
│ └── authMiddleware.js
| └── upload.js
│
├── views/
│ ├── auth/
| ├── / ── login.ejs
| ├── / ── register.ejs
│ ├── partials/
| ├── / ── head.ejs
| ├── / ── header.ejs
| ├── / ── footer.ejs
| ├── / ── sidebar.ejs
│ ├── user/
│ └── tasks/
| ├── / ── 404page.ejs
| ├── / ── createtask.ejs
| ├── / ── dashbaord.ejs
| ├── / ── edittask.ejs
| ├── / ── mytask.ejs
| ├── / ── editprofile.ejs
| ├── / ── home.ejs
| ├── / ── profile.ejs
│
├── public/
│ ├── css/
│ └── uploads/
│
├── .gitignore
├── app.js
├── server.js
└── package.json
