import React, { useEffect, useState } from "react";
import "./MyApplications.css";

function MyApplications() {
    const [applications, setApplications] = useState([]);

    const getApplications = async () => {
        const response = await fetch("http://localhost:4000/api/applications/my-applications");
        const data = await response.json();

        if (data.success) {
            setApplications(data.applications);
        }
    };

    useEffect(() => {
        getApplications();
    }, []);

    const pending = applications.filter((app) => app.status === "pending").length;
    const approved = applications.filter((app) => app.status === "approved").length;
    const rejected = applications.filter((app) => app.status === "rejected").length;

    return (
        <div className="applications-page">
            <h1>My Applications</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Applications</h3>
                    <p>{applications.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Pending</h3>
                    <p>{pending}</p>
                </div>

                <div className="stat-card">
                    <h3>Approved</h3>
                    <p>{approved}</p>
                </div>

                <div className="stat-card">
                    <h3>Rejected</h3>
                    <p>{rejected}</p>
                </div>
            </div>

            {applications.length === 0 ? (
                <p>No applications yet.</p>
            ) : (
                <div className="applications-list">
                    {applications.map((app) => (
                        <div className="application-card" key={app._id}>
                            <img src={app.pet?.image} alt={app.pet?.name} />

                            <div>
                                <h3>{app.pet?.name}</h3>
                                <p>Breed: {app.pet?.breed}</p>
                                <p>Phone: {app.phone}</p>
                                <p>Status: <span className={`status ${app.status}`}>{app.status}</span></p>
                                <p>Message: {app.message}</p>

                                {app.rejectionReason && (
                                    <p>Rejection Reason: {app.rejectionReason}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyApplications;