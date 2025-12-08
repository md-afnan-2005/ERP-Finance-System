import { useEffect, useState } from "react";
import api from "../../api/api";

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);

    const loadInvoices = async () => {
        const res = await api.get("/finance/invoices");
        setInvoices(res.data);
    };

    const updateStatus = async (id, status) => {
        await api.put(`/finance/invoices/${id}/status`, { status });
        loadInvoices();
    };

    useEffect(() => {
        loadInvoices();
    }, []);

    return (
        <div className="page">
            <h2>Invoice Payment Tracking</h2>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vendor</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoices.map(inv => (
                            <tr key={inv.id}>
                                <td>{inv.id}</td>
                                <td>{inv.vendor_id}</td>
                                <td>{inv.amount}</td>
                                <td>{inv.status}</td>
                                <td>
                                    <select
                                        onChange={e => updateStatus(inv.id, e.target.value)}
                                        defaultValue={inv.status}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Paid">Paid</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;
