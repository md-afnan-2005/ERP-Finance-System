import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const { user } = useAuth();
    const role = user?.role;

    return (
        <aside className="sidebar">
            <ul>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>

                {/* ADMIN MENU */}
                {role === "admin" && (
                    <>
                        <li><NavLink to="/users">User Management</NavLink></li>
                        <li><NavLink to="/finance/invoices">Invoices</NavLink></li>
                        <li><NavLink to="/finance/ledger">Ledger</NavLink></li>
                        <li><NavLink to="/projects">Projects</NavLink></li>
                        <li><NavLink to="/insights">AI Insights</NavLink></li>
                    </>
                )}

                {/* FINANCE MANAGER MENU */}
                {role === "finance" && (
                    <>
                        <li><NavLink to="/finance/invoices">Invoices</NavLink></li>
                        <li><NavLink to="/finance/ledger">Ledger</NavLink></li>
                    </>
                )}

                {/* PROJECT MANAGER MENU */}
                {role === "manager" && (
                    <>
                        <li><NavLink to="/projects">Projects</NavLink></li>
                    </>
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;
