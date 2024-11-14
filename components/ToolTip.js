"use client";

import React, { useState, useEffect, cloneElement } from 'react';

const ToolTip = ({ children, tooltipText = "No item selected" }) => {
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

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
  }, []);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="relative w-full tooltip-wrapper"
    >
      {cloneElement(children, { className: "tooltip-trigger" })}

      {isVisible && (
        <div
          style={{
            top: mousePosition.top,
            left: mousePosition.left,
          }}
          className={`fixed z-10 pointer-events-none bg-[#222222] text-white text-sm rounded p-4 
                      transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
