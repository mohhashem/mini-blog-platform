# 📝 Mini Blog Platform

A full-stack blog management platform built with:

- ⚙️ **.NET Core Web API (EF Core InMemory)**
- ⚛️ **Next.js with Material UI**
- 🔐 **JWT-based authentication**
- 🧪 Fully in-memory DB for fast testing & demo

---

## 📁 Project Structure

```
mini-blog-platform/
│
├── backend/               # .NET Core Web API
│   ├── Blog.API/
	├── Services/
│   ├── Infrastructure/
│   └── Domain/
│
├── frontend/              # Next.js + Material UI frontend
│   ├── app/
│       └──context/
		└──Layouts/
		└──services/
		└──sharedComponents/
		└──types/
		└──routes...
│    ...
│
└── README.md     
```

---

## 🚀 Features

### 🔧 Admin Panel
- 🔐 JWT login/logout
- ✍️ Create, edit, and delete blog posts
- 🗂 Switch between List and Table views
- 🟢 Status indicators (Published / Draft)
- ⚠️ Confirmation modals for delete actions

### 👁 Public Interface
- 📰 View only published posts
- 🔍 Access full blog post details

---

## ⚙️ Tech Stack

### 🔙 Backend
- **.NET 8 Web API**
- **Entity Framework Core (InMemory)**
- **JWT Authentication**
- **Clean architecture**

### 🔜 Frontend
- **Next.js (App Router)**
- **Material UI 5**
- **Axios** for API communication
- **React Context API** for global auth state
- **Atomic design structure** for reusable components

---

## 🧪 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mini-blog-platform.git
cd mini-blog-platform
```

---

### 2. Run the Backend

```bash
cd backend/Blog.API
dotnet restore
dotnet run
```


✅ In-memory DB is automatically seeded on startup.

---

### 3. Run the Frontend

```bash
cd ../../frontend
npm install
npm run dev
```

> Frontend will run at: `http://localhost:3000`

---

## 🔐 Default Admin Credentials

> These are seeded directly in the in-memory database:

| Username | Password hashed   
|----------|------------------------------------------------------------------------------------------|
| `admin`  | AQAAAAIAAYagAAAAECBDv45HjKh8fICAQiGHxYrLOG//1pNWP4o2hLW7823KluFc/NxDltWfAQDXP8ldlQ== |

password: admin123
> You can change this in `OnModelCreating` in `BlogDbContext.cs`

---

## 🙋‍♂️ Author

Built by **Mohamad Hashem**