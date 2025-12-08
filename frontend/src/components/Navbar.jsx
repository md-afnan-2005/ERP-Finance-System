import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <header className="navbar">
            <div className="navbar-left">🏗️ Construction ERP</div>
            <div className="navbar-right">
                {user && <span className="navbar-user">{user.name} ({user.role})</span>}
                {user && <button className="btn" onClick={logout}>Logout</button>}
            </div>
        </header>
    );
};
export default Navbar;
