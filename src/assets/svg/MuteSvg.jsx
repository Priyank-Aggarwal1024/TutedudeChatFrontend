import React from "react";

const MuteSvg = ({
  fill = "white",
  size = 18,
  cursor = "pointer",
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ cursor }}
    {...rest}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export default MuteSvg;
