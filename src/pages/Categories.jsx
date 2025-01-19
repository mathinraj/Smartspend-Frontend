import React, { useState } from 'react';
import CategoryList from '../components/Categories/CategoryList';
import CategoryForm from '../components/Categories/CategoryForm';
import CategoryPieChart from '../components/Categories/CategoryPieChart';
import SideMenu from '../components/SideMenu';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Food' },
        { id: 2, name: 'Transport' },
        { id: 3, name: 'Entertainment' },
    ]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleAdd = () => {
        setSelectedCategory(null);
        setShowForm(true);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    const handleSubmit = (category) => {
        if (selectedCategory) {
            // Update existing category
            setCategories(
                categories.map((c) =>
                    c.id === selectedCategory.id ? { ...c, name: category.name } : c
                )
            );
        } else {
            // Add new category
            setCategories([...categories, { id: Date.now(), name: category.name }]);
        }
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    // Placeholder data for the pie chart
    const pieChartData = [
        { name: 'Food', value: 400 },
        { name: 'Transport', value: 300 },
        { name: 'Entertainment', value: 200 },
    ];

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="d-flex flex-grow-1">
                <SideMenu />
                <div className="flex-grow-1 p-4">
                    <h1>Categories</h1>
                    {showForm ? (
                        <CategoryForm
                            category={selectedCategory}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <>
                            <button className="btn btn-primary mb-3" onClick={handleAdd}>
                                Add Category
                            </button>
                            <CategoryList
                                categories={categories}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </>
                    )}
                    <CategoryPieChart data={pieChartData} />
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;