import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const Button = ({
  icon,
  className,
  label,
  type,
  onClick = () => {},
  loading = false,
  disabled = false,
  iconPosition = "left", // Default position
}) => {
  return (
    <button
      type={type || "button"}
      className={clsx(
        "px-3 py-2 outline-none transition-colors",
        {
          "opacity-50 cursor-not-allowed": disabled, // Disabled styling
        },
        className
      )}
      onClick={onClick}
      disabled={disabled} // Disable button functionality
      aria-label={label} // Add aria-label for accessibility
    >
      {icon && iconPosition === "left" && icon}
      <span>{loading ? "Loading..." : label}</span>
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

// Prop types for better documentation and error checking
Button.propTypes = {
  icon: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  iconPosition: PropTypes.oneOf(["left", "right"]), // Allow icon position to be specified
};

// Default props
Button.defaultProps = {
  type: "button",
  loading: false,
  disabled: false,
  iconPosition: "left",
};

export default Button;
