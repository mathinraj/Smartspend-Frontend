// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const navLinks = [
        { to: "/dashboard", label: "Dashboard", auth: true },
        { to: "/transactions", label: "Transactions", auth: true },
        { to: "/categories", label: "Categories", auth: true },
        { to: "/budgets", label: "Budgets", auth: true },
        { to: "/users", label: "Users", auth: true, admin: true },
    ]
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                SmartSpend
            </div>
            <nav>
                <ul className="sidebar-nav">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.to;
                        const isAdmin = localStorage.getItem('role') === 'ADMIN';
                        if (link.auth && ( (link.admin && isAdmin) || !link.admin ))
                            return (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={isActive ? 'active' : ''}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            )
                        return null;
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;