import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import PropTypes from "prop-types";

const TaskTitle = ({ label, className, onAddClick }) => {
  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between shadow-sm'>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-4 h-4 rounded-full", className)} />
        <p className='text-sm md:text-base text-gray-600'>{label}</p>
      </div>

      <button
        className='hidden md:block p-1 hover:bg-gray-200 rounded transition-colors'
        aria-label={`Add ${label}`}
        onClick={onAddClick} // Added onClick prop
      >
        <IoMdAdd className='text-lg text-black' />
      </button>
    </div>
  );
};

// Adding prop types for better type checking
TaskTitle.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onAddClick: PropTypes.func, // Added prop type for the onClick function
};

export default TaskTitle;
