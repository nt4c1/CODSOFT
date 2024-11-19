import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Textbox = React.forwardRef(
  ({ type = "text", placeholder, label, className, register, name, error, errorColor = "#f64949fe" }, ref) => {
    return (
      <div className='w-full flex flex-col gap-1'>
        {label && (
          <label htmlFor={name} className='text-slate-800'>
            {label}
          </label>
        )}

        <div>
          <input
            id={name} // Ensure the input has an id
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register(name)} // Make sure to use register properly
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className
            )}
          />
        </div>
        {error && (
          <span className='text-xs' style={{ color: errorColor, marginTop: '0.5rem' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

// Adding prop types for better type checking
Textbox.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  register: PropTypes.func.isRequired, // This should be a function
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  errorColor: PropTypes.string, // Prop for customizable error color
};

export default Textbox;
