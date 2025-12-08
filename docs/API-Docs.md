# Construction ERP & Finance System — API Documentation

This document covers all REST APIs implemented in the ERP system.  
Base URL:

http://localhost:5000/api

yaml
Copy code

---

## 🔐 Authentication APIs

### **POST /auth/login**
Authenticate a user and return JWT token.

#### Request
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
Response
json
Copy code
{
  "token": "jwt-token",
  "role": "admin",
  "name": "Admin User"
}
👥 User Management (Admin Only)
GET /users/
Get all registered users.

POST /users/
Create a new user.

Request
json
Copy code
{
  "name": "New User",
  "email": "user@example.com",
  "password": "user123",
  "role": "finance"
}
Response
json
Copy code
{ "message": "User created successfully" }
💰 Finance — Ledger
GET /finance/ledger
Retrieve all journal ledger entries.

Response
json
Copy code
[
  {
    "id": 1,
    "account_name": "Cash",
    "debit": 10000,
    "credit": 0,
    "description": "Initial Capital Deposit",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
]
💵 Finance — Invoices
GET /finance/invoices
Retrieve all invoices.

POST /finance/invoices
Create a new invoice.

Request
json
Copy code
{
  "project_id": 1,
  "vendor_id": 2,
  "amount": 50000,
  "status": "Pending"
}
🏗 Projects
GET /projects/
Get all projects.

POST /projects/
Create a project.

PUT /projects/progress/:id
Update project progress.

Request
json
Copy code
{ "progress": 45 }
🤖 AI Insights
GET /insights/risk/:projectId
Return logic-based project risk score.

json
Copy code
{
  "project_id": 1,
  "risk_score": 72,
  "risk_level": "High"
}
📊 Dashboard
GET /dashboard/
Return KPIs for dashboard.

json
Copy code
{
  "totalProjects": 4,
  "totalInvoices": 12,
  "revenue": 150000,
  "cashflow": [20000, 35000, 15000]
}