import React from 'react';
import cn from 'classnames';

const SpinnerSvg = props => {
  const { className } = props;
  const svgClass = cn('spinner', className);
  return (
    <svg viewBox="0 0 66 66" {...props} className={svgClass}>
      <circle
        className="path"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
};

export default SpinnerSvg;
