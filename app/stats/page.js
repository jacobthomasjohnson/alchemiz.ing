"use client";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    // Animation styles
    const panelStyles = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: { tension: 200, friction: 20 },
    });

    return (
        <div className="fixed top-0 left-0 w-full h-full z-20">
            {/* Trigger Button */}
            <button
                className="p-2 bg-blue-500 text-white rounded-lg absolute top-4 left-4"
                onClick={() => setIsOpen(true)}
            >
                Open Panel
            </button>

            {/* Animated Overlay Panel */}
            <animated.div
                style={panelStyles}
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={() => setIsOpen(false)}
                    >
                        ✖
                    </button>
                    <h2 className="text-xl font-bold">About Alchemiz.ing</h2>
                    <p>This is the about panel. It animates in and overlays the content!</p>
                </div>
            </animated.div>
        </div>
    );
}
