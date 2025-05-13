import React from "react";

const SendSvg = ({
  fill = "#666666",
  opacity = 0.34,
  size = 17,
  cursor = "default",
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size * (18 / 17)} // Adjust height proportionally
    viewBox="0 0 17 18"
    fill={fill}
    style={{ cursor }}
    {...rest}
  >
    <g clipPath="url(#clip0_2517_8682)">
      <path
        d="M0.5625 15.741L16.2147 8.95839L0.5625 2.17578V7.39317L10.9973 8.95839L0.5625 10.5236V15.741Z"
        fill={fill}
        fillOpacity={opacity}
      />
    </g>
    <defs>
      <clipPath id="clip0_2517_8682">
        <rect
          width="16.6957"
          height="16.6957"
          fill="white"
          transform="translate(0.0390625 0.609375)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SendSvg;
