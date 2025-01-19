import React, { useState } from 'react';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
    const [name, setName] = useState(category ? category.name : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name });
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{category ? 'Edit Category' : 'Add Category'}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">
                        {category ? 'Update' : 'Add'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;