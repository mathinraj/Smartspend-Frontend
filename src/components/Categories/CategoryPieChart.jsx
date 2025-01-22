import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Define a consistent color scheme
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF',
  '#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00',
  '#00FFFF', '#800080', '#008000', '#000080', '#808000',
  '#800000', '#008080', '#808080', '#FFA500', '#A52A2A'
];

const CategoryPieChart = ({ data, type }) => {
  // Filter out categories with zero values
  const filteredData = data.filter((entry) => entry.value > 0);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{type === 'income' ? 'Income Distribution by Category' : 'Expense Distribution by Category'}</h5>
        <PieChart width={400} height={300}>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {filteredData.map((entry, index) => (
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