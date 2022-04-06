import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = (props) => {
    return props.loggedIn ? <Outlet /> : <Navigate to='/' />;
}

export default PrivateRoutes;