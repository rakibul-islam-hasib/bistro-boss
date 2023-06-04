import React from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { Navigate } from 'react-router-dom';

const DashboardHome = () => {
    const [isAdmin] = useAdmin();
    if(isAdmin) return <Navigate to="/dashboard/admin-home" />
    else return <Navigate to="/dashboard/user-home" />
};

export default DashboardHome;