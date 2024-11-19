import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  // Conditional rendering for when there are no tasks
  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full py-4 text-center text-gray-500">
        No tasks available.
      </div>
    );
  }

  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} /> /* Use task._id as the key */
      ))}
    </div>
  );
};

// Prop types for better documentation and error checking
BoardView.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Adjust according to your task shape
      // Add other task properties if needed
    })
  ),
};

export default BoardView;
