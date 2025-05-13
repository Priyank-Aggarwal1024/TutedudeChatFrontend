import React from "react";

const ArrowDownSvg = ({
  size = 20,
  color = "#666666",
  rotate = false,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size * 0.6}
    viewBox="0 0 20 12"
    fill="none"
    style={{
      transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
    }}
    {...rest}
  >
    <path
      d="M2 2.125L9.875 10L17.75 2.125"
      stroke={color}
      strokeWidth="2.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowDownSvg;
