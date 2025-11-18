🌐FRONTEND🌐


🏗️ Tech Stack
React.js (Vite)
Tailwind CSS
JavaScript (ES6+)
Mock API / JSON Data
(using public/data/companies.json or can be replaced with JSON Server / backend)

📂 Project Structure
/public
   └── data/companies.json       # Mock data

/src
   ├── App.jsx                   # Main logic & state
   ├── main.jsx                  # React entry point
   ├── index.css                 # Global + Tailwind styles
   └── components/
        ├── Filters.jsx          # Search + Dropdown filters
        └── CompanyTable.jsx     # Table UI for companies

/tailwind.config.js              # Tailwind setup
/vite.config.js                  # Vite configuration
/package.json                    # Project scripts & dependencies

⚙️ Setup & Installation
1. Clone the Repository
git clone https://github.com/your-username/companies-directory.git
cd companies-directory

2. Install Dependencies
npm install

3. Run the Development Server
npm run dev


Your app will start at:
👉 http://localhost:5173/

🌐BACKEND🌐

# 📌 Companies Directory – Backend (Node.js + Express + MongoDB)

This is the backend service for the **Companies Directory** application.  
The API provides CRUD operations for managing company data and is built using **Node.js, Express, and MongoDB** with **Mongoose** as the ODM.

---

## 🚀 Features

- RESTful API for company management  
- MVC architecture (Models, Controllers, Routes)  
- MongoDB database integration using Mongoose  
- Environment-based configuration using `.env`  
- CORS enabled for frontend communication  
- JSON request body parsing  
- Health check endpoint  
- Clean project structure and scalable codebase  

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **ES Modules**
- **dotenv** for environment handling
- **CORS** for cross-origin access
- **Nodemon** for development

---

## 📂 Project Structure

├── controllers/
│ └── companyController.js
├── models/
│ └── companyModel.js
├── routes/
│ └── companyRoutes.js
├── server.js
├── package.json
├── .env (ignored from git)
└── README.md

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/companies-backend.git
cd companies-backend

2️⃣ Install Dependencies
npm install

3️⃣ Create a .env file
PORT=5000
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=development

4️⃣ Start the Server
Development (auto-reload)
npm run dev

Production
npm start
