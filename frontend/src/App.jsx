import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Admin/Users";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Invoices from "./pages/Finance/Invoices";
import Ledger from "./pages/Finance/Ledger";
import Projects from "./pages/Projects/Projects";
import AIInsights from "./pages/Insights/AIInsights";

import "./styles/global.css";

const App = () => {
    const { token, user } = useAuth();

    if (!token) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    const role = user?.role;

    return (
        <div className="app-root">
            <Navbar />
            <div className="main-layout">
                <Sidebar />
                <main className="content">
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* ADMIN */}
                        {role === "admin" && (
                            <>
                                <Route path="/users" element={<Users />} />
                                <Route path="/finance/invoices" element={<Invoices />} />
                                <Route path="/finance/ledger" element={<Ledger />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/insights" element={<AIInsights />} />
                            </>
                        )}

                        {/* FINANCE MANAGER */}
                        {role === "finance" && (
                            <>
                                <Route path="/finance/invoices" element={<Invoices />} />
                                <Route path="/finance/ledger" element={<Ledger />} />
                            </>
                        )}

                        {/* PROJECT MANAGER */}
                        {role === "manager" && (
                            <>
                                <Route path="/projects" element={<Projects />} />
                            </>
                        )}

                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;
