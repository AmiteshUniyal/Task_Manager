import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

function MyPieChart({ complete, remaining }) {
  const data = [
    { name: "Completed", value: complete },
    { name: "Remaining", value: remaining },
  ];
  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg ">
      <h1 className="text-center bg-white mx-auto font-bold text-2xl text-gray-800 mb-4">
        Task Completion Chart
      </h1>
      
      <div className="h-64 sm:h-72 md:h-80 lg:h-96 max-h-[500px]">
        <ResponsiveContainer width="101%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
}

export default MyPieChart;
