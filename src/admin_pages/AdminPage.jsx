import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin2.0.css';

const AdminPage = () => {
    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <div className="admin-links">
                <Link to="/add-tour" className="admin-link">Add Tour</Link>
                <Link to="/add-location" className="admin-link">Add Location</Link>
                <Link to="https://voucher4u.io.vn/Partner/DashBoardPartner" className="admin-link">Tạo Voucher</Link>
            </div>
        </div>
    );
};

export default AdminPage;
