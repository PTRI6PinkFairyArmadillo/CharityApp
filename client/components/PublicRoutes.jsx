import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = (props) => {
    return props.loggedIn ? <Navigate to='/dashboard' /> : <Outlet />
}

export default PublicRoutes;