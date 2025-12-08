import { useEffect, useState } from "react";
import api from "../../api/api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });

    const loadUsers = async () => {
        const res = await api.get("/users");
        setUsers(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/users", form);
        setForm({ name: "", email: "", password: "", role: "admin" });
        loadUsers();
    };

    const deleteUser = async (id) => {
        await api.delete(`/users/${id}`);
        loadUsers();
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="page">
            <h2>User Management</h2>

            <div className="form-card">
                <h3>Create New User</h3>

                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <label>Role</label>
                    <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="admin">Admin</option>
                        <option value="finance">Finance Manager</option>
                        <option value="manager">Project Manager</option>
                    </select>

                    <button className="btn primary" type="submit">
                        Create User
                    </button>
                </form>
            </div>

            <div className="table-card">
                <h3>All Users</h3>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button
                                        className="btn danger"
                                        onClick={() => deleteUser(u.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
