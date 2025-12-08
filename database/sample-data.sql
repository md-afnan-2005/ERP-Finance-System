-- ============================================
-- Insert Users (Admin, Finance Manager, PM)
-- ============================================
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2b$10$KIXhB8x7BqXc9EwP6KDc8udtSaTpHUGYkSwB3hXh5UeK0BleX0cm2', 'admin'),
('Finance Manager', 'finance@example.com', '$2b$10$KIXhB8x7BqXc9EwP6KDc8udtSaTpHUGYkSwB3hXh5UeK0BleX0cm2', 'finance'),
('Project Manager', 'pm@example.com', '$2b$10$KIXhB8x7BqXc9EwP6KDc8udtSaTpHUGYkSwB3hXh5UeK0BleX0cm2', 'manager');

-- ============================================
-- Insert Vendors
-- ============================================
INSERT INTO vendors (name, email, phone) VALUES
('ABC Constructions', 'abc@vendor.com', '9876543210'),
('BuildMax Ltd', 'buildmax@vendor.com', '9988776655'),
('SteelWorks Pvt Ltd', 'steel@vendor.com', '9001122334');

-- ============================================
-- Insert Customers
-- ============================================
INSERT INTO customers (name, email, phone) VALUES
('City Developers', 'citydev@customer.com', '9123456780'),
('Skyline Properties', 'skyline@customer.com', '9988221144'),
('Urban Infra', 'urbaninfra@customer.com', '9090909090');

-- ============================================
-- Accounts (General Ledger)
-- ============================================
INSERT INTO accounts (name, type, balance) VALUES
('Cash', 'Asset', 50000),
('Bank Account', 'Asset', 150000),
('Accounts Payable', 'Liability', 0),
('Revenue', 'Revenue', 0),
('Construction Expenses', 'Expense', 0);

-- ============================================
-- Journal Entries
-- ============================================
INSERT INTO journal_entries (account_id, debit, credit, description) VALUES
(1, 10000, 0, 'Initial cash deposit'),
(2, 0, 5000, 'Vendor payment'),
(5, 3000, 0, 'Material purchase'),
(4, 0, 15000, 'Received client payment');

-- ============================================
-- Projects
-- ============================================
INSERT INTO projects (name, description, budget, spent, progress, status, start_date, end_date, manager_id)
VALUES
('Residential Tower A', '20-floor building project', 1000000, 250000, 25, 'In Progress', '2025-01-01', '2025-12-31', 3),
('Mall Renovation', 'Renovation of shopping mall', 500000, 150000, 30, 'In Progress', '2025-02-10', '2025-10-30', 3),
('Highway Extension', '6 km road expansion project', 800000, 50000, 10, 'Started', '2025-03-05', '2026-03-05', 3),
('Smart City Lighting', 'Installation of smart street lights', 300000, 100000, 40, 'In Progress', '2025-01-15', '2025-06-15', 3);

-- ============================================
-- Project Progress Logs
-- ============================================
INSERT INTO project_progress (project_id, progress) VALUES
(1, 20),
(1, 25),
(2, 25),
(2, 30),
(3, 10),
(4, 35),
(4, 40);

-- ============================================
-- Invoices
-- ============================================
INSERT INTO invoices (project_id, vendor_id, amount, status) VALUES
(1, 1, 75000, 'Pending'),
(2, 2, 50000, 'Paid'),
(3, 3, 25000, 'Pending'),
(4, 1, 40000, 'Paid');

-- ============================================
-- Payments
-- ============================================
INSERT INTO payments (invoice_id, amount) VALUES
(2, 50000),
(4, 40000);

-- ============================================
-- Exchange Rates
-- ============================================
INSERT INTO exchange_rates (currency, rate) VALUES
('USD', 83.20),
('EUR', 90.50),
('AED', 22.70);

-- ============================================
-- AI Risk Logs (Example)
-- ============================================
INSERT INTO risk_logs (project_id, risk_level, score) VALUES
(1, 'Medium', 45),
(2, 'High', 72),
(3, 'Low', 20),
(4, 'Critical', 88);

COMMIT;
