import React from "react";
import PropTypes from "prop-types"; // For prop validation
import './Loading.css'; // Ensure you have this CSS file imported

const Loading = ({ dotCount = 5, dotColor = '#000' }) => {
  const dots = Array.from({ length: dotCount }, (_, index) => (
    <div key={index} className='dot' style={{ backgroundColor: dotColor }} />
  ));

  return (
    <div className='dots-container' aria-live="polite" aria-label="Loading">
      {dots}
    </div>
  );
};

Loading.propTypes = {
  dotCount: PropTypes.number,
  dotColor: PropTypes.string,
};

export default Loading;
