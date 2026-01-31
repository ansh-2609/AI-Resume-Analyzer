// client/src/components/Analytics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Analytics({ userId }) {
    const [stats, setStats] = useState(null);
    
    useEffect(() => {
        fetchAnalytics();
    }, []);
    
    const fetchAnalytics = async () => {
        const response = await axios.get(
            `http://localhost:5000/api/analytics/${userId}`
        );
        setStats(response.data);
    };
    
    if (!stats) return <div>Loading analytics...</div>;
    
    const chartData = [
        { name: 'Saved', count: stats.status_counts.saved },
        { name: 'Applied', count: stats.status_counts.applied },
        { name: 'Interview', count: stats.status_counts.interview },
        { name: 'Offer', count: stats.status_counts.offer },
        { name: 'Rejected', count: stats.status_counts.rejected }
    ];
    
    return (
        <div className="analytics">
            <h3>Your Job Search Analytics</h3>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h4>Total Applications</h4>
                    <p className="stat-number">{stats.total_applications}</p>
                </div>
                
                <div className="stat-card">
                    <h4>Interview Rate</h4>
                    <p className="stat-number">{stats.interview_rate}%</p>
                </div>
                
                <div className="stat-card">
                    <h4>Avg Match Score</h4>
                    <p className="stat-number">{stats.avg_match_score}%</p>
                </div>
            </div>
            
            <div className="chart-section">
                <h4>Application Status</h4>
                <BarChart width={500} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </div>
            
            <div className="skills-section">
                <h4>Your Top Skills</h4>
                <ul>
                    {stats.top_skills.map((skill, idx) => (
                        <li key={idx}>{skill.name} - {skill.count} jobs</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Analytics;