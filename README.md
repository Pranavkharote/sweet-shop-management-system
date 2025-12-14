# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built as part of a technical assessment.  
The application supports **authentication, role-based access, inventory management, searching, filtering, purchasing, and restocking sweets**.

This repository also demonstrates **responsible AI usage** and **safe Git practices**, as explicitly required by the assignment.

---

## 🧾 Project Overview

The system supports two roles:

### 👤 USER
- Register and log in
- View available sweets
- Search sweets by name
- Filter sweets by category and price
- Purchase sweets with quantity validation

### 👑 ADMIN
- All USER capabilities
- Add new sweets
- Restock existing sweets
- Delete sweets from inventory

---

## 🧱 Technology Stack

### 🌐 Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### 🛠 Backend
- Node.js
- Express.js (TypeScript)
- MongoDB (Mongoose)
- JWT Authentication

---

## 📁 Repository Structure

Sweet_Shop
├── frontend/ # React frontend
├── backend/ # Primary backend source (used by the application)
├── backend_backup/ # Backup copy of backend (see explanation below)
└── README.md


---

## ⚠️ Important Note About `backend_backup`

### ❓ Why does `backend_backup` exist?

During development, the `backend` directory was **accidentally initialized as a separate Git repository (nested repo)**.  
This caused GitHub and VS Code to treat it as a **submodule**, making the folder inaccessible in the repository UI.

To safely fix this without risking code loss, a **best-practice recovery approach** was followed.

### ✅ What was done
- Created `backend_backup` as a temporary safety copy
- Removed Git metadata from the original backend
- Restored `backend` as a normal directory
- Committed both folders to maintain full transparency

### 🧠 Why this is intentional (not a mistake)
- Prevents accidental data loss during repository restructuring
- Demonstrates safe handling of Git issues under time pressure
- Makes the recovery steps auditable for reviewers

👉 The application uses the **`backend/`** folder.  
👉 **`backend_backup/`** exists only as a reference and safety snapshot.

---

## ⚙️ How to Run the Project Locally

### 🔹 Backend Setup

```bash
cd backend
npm install
npm run dev
```
Backend runs on
http://localhost:5000

### 🔹 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on:
http://localhost:5173

### Search & Filter Functionality

The backend supports combined filtering using query parameters:

name → text search

category → category filter (case-insensitive)

minPrice / maxPrice → price range filter
example:
```bash
/api/sweets/search?name=laddu&category=Traditional&minPrice=0&maxPrice=100
```

## 🧪 Test Report

### ⏱ Testing Scope
Due to **limited time**, a complete automated test suite could not be implemented.

### ✅ Testing Performed
- Manual API testing using Postman
- Manual UI testing for:
  - Authentication
  - Role-based access
  - Search and filtering
  - Purchase and restock flows

### ❌ Known Limitations
- No automated unit tests for backend services
- No integration test suite
- No frontend component tests

These limitations are **explicitly disclosed** as required.

---

## 🤖 My AI Usage (Mandatory Section)

### 🧠 AI Tools Used
- **ChatGPT (OpenAI)**

### 🛠 How AI Was Used
- Debugging React state and `useEffect` dependency issues
- Identifying frontend ↔ backend query mismatches
- Brainstorming filtering logic and API design
- Improving commit messages and documentation clarity

### 👨‍💻 What Was Done Manually
- All frontend and backend implementation
- Database schema and query logic
- Authentication and authorization
- Debugging using browser DevTools and logs
- Repository restructuring and recovery
- Manual testing and validation

### 🪞 Reflection
AI tools improved debugging speed and helped surface blind spots, but all decisions, fixes, and final implementations were reviewed, understood, and executed manually.

---

## 📦 Deliverables Summary

- ✅ Public Git repository
- ✅ Full source code (frontend + backend)
- ✅ Transparent AI usage disclosure
- ✅ Test report with limitations
- ✅ Local setup instructions
- ⚠️ Deployment not completed due to time constraints

---

## 👤 Author

**Pranav**  
Full Stack Developer Candidate
