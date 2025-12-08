import { useEffect, useState } from "react";
import api from "../../api/api";
import Card from "../../components/Card";
import Chart from "../../components/Chart";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/dashboard");
                setData(res.data);
            } catch (err) {
                setError("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;
    if (error) return <div className="error">{error}</div>;

    const chartData = [
        { label: "Projects", value: Number(data.totalProjects || 0) },
        { label: "Invoices", value: Number(data.totalInvoices || 0) },
        { label: "Revenue", value: Number(data.revenue || 0) }
    ];

    return (
        <div className="page">
            <h2>Dashboard</h2>
            <div className="card-grid">
                <Card title="Total Projects" value={data.totalProjects} />
                <Card title="Total Invoices" value={data.totalInvoices} />
                <Card title="Revenue (Paid)" value={`$${data.revenue}`} />
            </div>
            <div className="chart-grid">
                <Chart data={chartData} dataKey="value" xKey="label" label="Key Metrics Overview" />
            </div>
        </div>
    );
};
export default Dashboard;
