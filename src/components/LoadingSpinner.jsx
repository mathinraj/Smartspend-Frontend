import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
      </div>
    );
};

export default LoadingSpinner;