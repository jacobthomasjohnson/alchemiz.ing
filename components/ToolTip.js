"use client";

// components/Tooltip.js
import { useState } from "react";

export default function ToolTip({ text, children, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      className="relative w-full"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {/* The component to be wrapped */}
      {children}

      {/* Tooltip */}
      {isVisible && (
        <div
          className={`absolute z-10 p-4 text-white text-xs bg-transparent rounded-sm ${getTooltipPosition(
            position
          )}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}

// Helper function to determine tooltip position
function getTooltipPosition(position) {
  switch (position) {
    case "top":
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    case "bottom":
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    case "left":
      return "right-full top-1/2 transform -translate-y-1/2 mr-2";
    case "right":
      return "left-full top-1/2 transform -translate-y-1/2 ml-2";
    default:
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
  }
}
