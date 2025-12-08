import { useEffect, useState } from "react";
import api from "../../api/api";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const loadProjects = async () => {
        const res = await api.get("/projects");
        setProjects(res.data);
    };

    const updateProgress = async (id, progress) => {
        if (progress < 0 || progress > 100) return;

        await api.put(`/projects/${id}/progress`, { progress });
        loadProjects();
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div className="page">
            <h2>Update Project Progress</h2>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Project</th>
                            <th>Current Progress</th>
                            <th>Update %</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projects.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.progress}%</td>

                                <td>
                                    <input
                                        type="number"
                                        defaultValue={p.progress}
                                        onBlur={(e) => updateProgress(p.id, e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Projects;
