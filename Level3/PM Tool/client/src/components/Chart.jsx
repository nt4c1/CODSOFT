import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Chart = ({ data, height = 300, color = "#8884d8" }) => {
  // Check if data is empty and render a fallback if necessary
  if (!data || data.length === 0) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <ResponsiveContainer width={"100%"} height={height}>
      <BarChart data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Prop types for better documentation and error checking
Chart.propTypes = {
  data: PropTypes.array.isRequired, // Expect data to be an array
  height: PropTypes.number, // Optional height prop
  color: PropTypes.string, // Optional color prop
};

// Default props
Chart.defaultProps = {
  height: 300, // Default height
  color: "#8884d8", // Default bar color
};

export default Chart;
