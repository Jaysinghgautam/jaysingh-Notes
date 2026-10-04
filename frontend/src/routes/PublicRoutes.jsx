import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PublicRoutes() {
    const user = useSelector((state) => state.auth.user);
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    if (user || token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}