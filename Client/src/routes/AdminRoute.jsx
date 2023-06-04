import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useAdmin } from '../hooks/useAdmin';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user: authUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    if (!isAdmin && authUser?.email) {
        return <Navigate to="/dashboard" />
    }
    return children;
};

export default AdminRoute;