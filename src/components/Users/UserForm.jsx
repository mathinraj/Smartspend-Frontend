import React, { useState } from 'react';

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [username, setUsername] = useState(user ? user.username : '');
    const [password, setPassword] = useState(user ? user.password : '');
    const [role, setRole] = useState(user ? user.role : 'user');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, password, role });
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{user ? 'Edit User' : 'Add User'}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            id="role"
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary me-2">
                        {user ? 'Update' : 'Add'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;