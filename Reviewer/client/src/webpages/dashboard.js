import React from 'react';
import './css/dashboard.css';
const Dashboard = () => {
    return (
        <body className="body">
            <h1 className="header">Welome to Reviewer Page</h1><br/>
        <div className="btn-group">
            <div className="center">
            <h1>Go to Reacher Review page</h1><br/>
            <a className="link" href="/researcher">Click here</a><br/>
            <h1>Go to Workshop Presenter Review page</h1><br/>
            <a className="link" href="/workshop">Click here</a><br/>
            </div>
        </div>
        </body>
    );
};
export default Dashboard;