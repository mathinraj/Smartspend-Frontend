// src/components/Categories/CategoryPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
  '#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00',
  '#00FFFF', '#800080', '#008000', '#000080', '#808000',
  '#800000', '#008080', '#808080', '#FFA500', '#A52A2A'
]; // Colors for the pie chart

const CategoryPieChart = ({ data }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Expense Distribution by Category</h5>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default CategoryPieChart;