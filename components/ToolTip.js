"use client";

import React, { useState, useEffect, cloneElement } from 'react';

const ToolTip = ({ children, defaultText = "No item selected" }) => {
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Extract the text prop from the ListItem, if available
  const itemText = children.props.text;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      const offsetX = window.innerWidth - x < 150 ? -120 : 20;
      const offsetY = 30;

      setMousePosition({
        top: y + offsetY,
        left: x + offsetX,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []); // Runs only once, after component mounts

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  // Tooltip text based on whether `itemText` is present
  const tooltipText = itemText ? `Sell a ${itemText}` : defaultText;

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="relative w-full"
    >
      {cloneElement(children, { className: "tooltip-trigger" })}

      {isVisible && (
        <div
          style={{
            top: mousePosition.top,
            left: mousePosition.left,
          }}
          className="fixed z-10 pointer-events-none bg-[#222222] text-white text-sm rounded p-4 
                      transition-opacity duration-500 opacity-100"
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
