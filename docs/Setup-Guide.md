# Construction ERP — Setup Guide

Follow these steps to run the ERP system locally.

---

# 1. Prerequisites
Ensure the following are installed:

- Node.js (version 20+ recommended)
- PostgreSQL 14+  
- Git
- VS Code

---

# 2. Clone the Project
```sh
git clone <your-repo-url>
cd erp-finance-ai-system
3. Setup Backend
Step 1 — Navigate to backend folder
sh
Copy code
cd backend
Step 2 — Install dependencies
sh
Copy code
npm install
Step 3 — Configure .env
ini
Copy code
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=YourPassword
DB_NAME=construction_erp
DB_PORT=5432
JWT_SECRET=mysecretkey
Step 4 — Initialize database
Run schema:

sh
Copy code
psql -U postgres -d construction_erp -f database/schema.sql
Load sample data:

sh
Copy code
psql -U postgres -d construction_erp -f database/sample-data.sql
Step 5 — Start backend
sh
Copy code
npm start
4. Setup Frontend
Step 1 — Navigate to frontend
sh
Copy code
cd ../frontend
Step 2 — Install dependencies
sh
Copy code
npm install
Step 3 — Start frontend
sh
Copy code
npm run dev
5. Default Login Credentials
Role	Email	Password
Admin	admin@example.com	admin123
Finance Manager	finance@example.com	finance123
Project Manager	pm@example.com	pm123

6. Folder Structure (Short)
pgsql
Copy code
backend/
  src/
    modules/
      auth/
      users/
      finance/
      projects/
      insights/
frontend/
  src/
    pages/
    components/
    api/
    styles/
database/
  schema.sql
  sample-data.sql
docs/
  API-Docs.md
  Setup-Guide.md
  Features.md
  System-Architecture.md