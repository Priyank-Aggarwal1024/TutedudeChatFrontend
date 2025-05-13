import React from "react";

const ArrowRight = ({
  rotate = false,
  color = "#992E9D",
  width = "6",
  height = "12",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 6 12"
      fill="none"
      style={{
        transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
        cursor: "pointer",
      }}
      {...props}
    >
      <path
        d="M0.946543 1.0463L4.99093 5.65151L1.05844 10.3526"
        stroke={color}
        strokeWidth="1.64966"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
