import { useEffect, useState } from "react";
import api from "../../api/api";

const Ledger = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadLedger = async () => {
        try {
            const res = await api.get("/finance/ledger");
            setEntries(res.data);
        } catch (err) {
            console.error("Failed to load ledger:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadLedger();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="page">
            <h2>General Ledger</h2>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Account</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan="6">No ledger entries found.</td>
                            </tr>
                        ) : (
                            entries.map(row => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.account_name}</td>
                                    <td>{row.debit}</td>
                                    <td>{row.credit}</td>
                                    <td>{row.description}</td>
                                    <td>{new Date(row.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ledger;
