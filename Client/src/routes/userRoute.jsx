import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const UserRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    if (loader) {
        return <div>Loading...</div>
    }
    if (!user?.email) {
        return <Navigate to="/login" />
    }
    
    return children;
};

export default UserRoute;