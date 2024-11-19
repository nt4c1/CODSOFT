import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

const Title = ({ title = "Default Title", className, textColor }) => {
  return (
    <h2 className={clsx("text-2xl font-semibold capitalize", className, textColor)}>
      {title}
    </h2>
  );
};

// Adding prop types for better type checking
Title.propTypes = {
  title: PropTypes.string,      // Expecting a string for title
  className: PropTypes.string,   // Expecting optional class name
  textColor: PropTypes.string,   // Optional prop for text color
};

export default Title;
