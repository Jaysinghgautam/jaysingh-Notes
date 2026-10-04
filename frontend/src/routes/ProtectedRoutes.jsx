import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoutes() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    useEffect(() => {
        if (!user && !token) {
            navigate('/login');
        }
    }, [user, token, navigate]);

    return <Outlet />;
}