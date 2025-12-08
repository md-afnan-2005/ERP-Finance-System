import { useEffect, useState } from "react";
import api from "../../api/api";
import Card from "../../components/Card";

const AIInsights = () => {
    const [projects, setProjects] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [risk, setRisk] = useState(null);
    const [cashflow, setCashflow] = useState(null);
    const [error, setError] = useState("");

    const loadProjects = async () => {
        try {
            const res = await api.get("/projects");
            setProjects(res.data);
        } catch {
            setError("Failed to load projects");
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const fetchInsights = async () => {
        if (!selectedId) return;
        setError("");
        try {
            const [riskRes, flowRes] = await Promise.all([
                api.get(`/insights/risk/${selectedId}`),
                api.get(`/insights/cashflow/${selectedId}`)
            ]);
            setRisk(riskRes.data);
            setCashflow(flowRes.data);
        } catch {
            setError("Failed to fetch insights");
        }
    };

    return (
        <div className="page">
            <h2>AI Insights</h2>
            {error && <div className="error">{error}</div>}
            <div className="form-card">
                <label>Select Project</label>
                <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                    <option value="">-- Choose --</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                <button className="btn primary" onClick={fetchInsights} disabled={!selectedId}>
                    Get Insights
                </button>
            </div>

            <div className="card-grid">
                {risk && (
                    <Card
                        title="Risk Score"
                        value={risk.risk_score}
                        subtitle={`Level: ${risk.risk_level}`}
                    />
                )}
                {cashflow && (
                    <Card
                        title="Cash Flow Forecast"
                        value={`$${cashflow.forecast_next_month || 0}`}
                        subtitle="Next month (estimated)"
                    />
                )}
            </div>
        </div>
    );
};
export default AIInsights;
