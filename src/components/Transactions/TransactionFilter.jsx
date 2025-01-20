// import React, { useState } from 'react';

// const TransactionFilter = ({ onFilter }) => {
//     const [category, setCategory] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     const handleFilter = (e) => {
//         e.preventDefault();
//         onFilter({ category, startDate, endDate });
//     };

//     return (
//         <div className="card mb-4">
//             <div className="card-body">
//                 <h5 className="card-title">Filter Transactions</h5>
//                 <form onSubmit={handleFilter}>
//                     <div className="row">
//                         <div className="col-md-4">
//                             <label htmlFor="category" className="form-label">Category</label>
//                             <input
//                                 type="text"
//                                 id="category"
//                                 className="form-control"
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label htmlFor="startDate" className="form-label">Start Date</label>
//                             <input
//                                 type="date"
//                                 id="startDate"
//                                 className="form-control"
//                                 value={startDate}
//                                 onChange={(e) => setStartDate(e.target.value)}
//                             />
//                         </div>
//                         <div className="col-md-4">
//                             <label htmlFor="endDate" className="form-label">End Date</label>
//                             <input
//                                 type="date"
//                                 id="endDate"
//                                 className="form-control"
//                                 value={endDate}
//                                 onChange={(e) => setEndDate(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <button type="submit" className="btn btn-primary mt-3">Apply Filter</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default TransactionFilter;

import React, { useState } from 'react';

const TransactionFilter = ({ onFilter, onClear }) => {
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = (e) => {
        e.preventDefault();
        onFilter({ category, startDate, endDate });
    };

    const handleClear = () => {
        setCategory('');
        setStartDate('');
        setEndDate('');
        onClear(); // Call the onClear callback to reset the filtered results
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">Filter Transactions</h5>
                <form onSubmit={handleFilter}>
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input
                                type="text"
                                id="category"
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary me-2">
                            Apply Filter
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleClear}
                        >
                            Clear Filter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionFilter;