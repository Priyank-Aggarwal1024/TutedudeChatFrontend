import React from "react";

const StatusSvg = ({ color = "#44CC3E", size = 10, ...props }) => {
  const outerSize = size;
  const innerSize = (size * 7.57143) / 10; // scale based on original SVG ratio

  return (
    <div
      style={{
        width: outerSize,
        height: outerSize,
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <div
        style={{
          width: innerSize,
          height: innerSize,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default StatusSvg;
