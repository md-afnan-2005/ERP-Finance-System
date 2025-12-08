-- ============================
-- DROP OLD TABLES (SAFE RESET)
-- ============================
DROP TABLE IF EXISTS risk_logs CASCADE;
DROP TABLE IF EXISTS project_progress CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS journal_entries CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS exchange_rates CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================
-- USERS TABLE
-- ============================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,        -- admin, finance, manager
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- ACCOUNTS TABLE
-- ============================
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,        -- Asset, Liability, Expense, Revenue
    balance NUMERIC(12,2) DEFAULT 0
);

-- ============================
-- JOURNAL ENTRIES
-- ============================
CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    debit NUMERIC(12,2) DEFAULT 0,
    credit NUMERIC(12,2) DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- PROJECTS TABLE
-- ============================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    budget NUMERIC(12,2) NOT NULL,
    spent NUMERIC(12,2) DEFAULT 0,
    progress INT DEFAULT 0,              -- 0–100
    status VARCHAR(50) DEFAULT 'Not Started',
    start_date DATE,
    end_date DATE,
    manager_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- PROJECT PROGRESS LOGS
-- ============================
CREATE TABLE project_progress (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    progress INT NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- INVOICES TABLE
-- ============================
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    vendor_id INT,
    amount NUMERIC(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',    -- Pending, Paid
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- PAYMENTS TABLE
-- ============================
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    invoice_id INT REFERENCES invoices(id),
    amount NUMERIC(12,2) NOT NULL,
    paid_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- VENDORS TABLE
-- ============================
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT
);

-- ============================
-- CUSTOMERS TABLE
-- ============================
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT
);

-- ============================
-- EXCHANGE RATES TABLE
-- ============================
CREATE TABLE exchange_rates (
    id SERIAL PRIMARY KEY,
    currency VARCHAR(10),
    rate NUMERIC(12,4),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- AI / RISK LOG TABLE
-- ============================
CREATE TABLE risk_logs (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id),
    risk_level VARCHAR(50),
    score INT,
    created_at TIMESTAMP DEFAULT NOW()
);

COMMIT;
