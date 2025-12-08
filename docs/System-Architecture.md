# ✅ **4. System-Architecture.md**

```md
# System Architecture — Construction ERP & Finance System

This document explains the architecture, design patterns, and data flow of the ERP system.

---

# 1. Architecture Overview

The system follows a **3-tier architecture**:

### 1. Client (Frontend)
- React.js
- Axios for API calls
- Role-based UI rendering

### 2. Server (Backend)
- Node.js + Express.js
- Modular MVC structure
- JWT Auth + Middleware
- Controllers + Services

### 3. Database (PostgreSQL)
- Relational DB for structured ERP data

---

# 2. High-Level Architecture Diagram

┌──────────────────────┐
│ React Frontend │
│ (Login, Dashboard) │
└──────────┬────────────┘
│ HTTP / JSON
┌──────────▼───────────┐
│ Node.js Backend │
│ Routes → Controllers │
│ Controllers → Services│
│ Services → Database │
└──────────┬────────────┘
│ SQL Queries
┌──────────▼───────────┐
│ PostgreSQL DB │
└────────────────────────┘

yaml
Copy code

---

# 3. Backend Architecture

### ✔ Routes  
Handle API endpoints only.

### ✔ Controllers  
Business logic for each module:
- Auth
- Users
- Finance
- Projects
- Insights
- Dashboard

### ✔ Database Layer  
- Pool-based PostgreSQL connections
- SQL queries using parameters

---

# 4. Frontend Architecture

### ✔ Components  
Reusable UI (Navbar, Sidebar, Cards)

### ✔ Pages  
Dashboard, Projects, Finance, AI Insights, Users

### ✔ Context  
Authentication context manages:
- token
- user
- role
- login/logout

### ✔ API Service  
Centralized Axios instance handles:
- base URL
- Authorization header
- Request interceptors

---

# 5. Role-Based Access Control

| Role | Permissions |
|------|-------------|
| Admin | Full access + User Management |
| Finance Manager | Ledger + Invoices |
| Project Manager | Project Progress updates |

---

# 6. AI Module Flow

1. Fetch budget, spent, timeline, invoice delays  
2. Apply rule-based scoring formulas  
3. Produce risk level: Low / Medium / High / Critical  
4. Send insights to dashboard  

---

# 7. Database Schema Diagram (Summary)

Tables:

- users  
- projects  
- project_progress  
- invoices  
- payments  
- accounts  
- journal_entries  
- vendors  
- customers  
- exchange_rates  
- risk_logs  

Each is linked through foreign keys ensuring proper relational structure.

---

# 8. Why This Architecture?

✔ Scalable  
✔ Modular  
✔ Easy to debug  
✔ Clear separation of concerns  
✔ Production ready  

---

# End of System Architecture Documentation