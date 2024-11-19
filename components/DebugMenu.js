"use client";

import useDebugStore from "@/store/debugStore";
import { useEffect, useRef } from "react";

export function DebugMenu() {
    const debugMessage = useDebugStore((state) => state.debugMessage);
    const debugTrigger = useDebugStore((state) => state.debugTrigger); // Listen to the trigger
    const debugColor = useDebugStore((state) => state.debugColor);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!debugMessage) return; // Skip if there's no message

        // Create a new div
        const debugDiv = document.createElement("div");
        debugDiv.textContent = debugMessage;
        debugDiv.className = `debug-message mb-2 p-1 rounded transition-opacity duration-4000`;
        
        let textColor = null;

        if(debugColor === 'blue') {
            textColor = "blue";
        } else if (debugColor === 'red') {
            textColor = "red";
        } else if (debugColor === 'green') {
            textColor = "green";
        }

        debugDiv.style = `color: ${textColor}`;

        debugDiv.style.animation = "fade-out 4s ease-out forwards";

        // Append the div to the container
        containerRef.current.appendChild(debugDiv);

        // Remove the div after the animation ends
        const timer = setTimeout(() => {
            debugDiv.remove();
        }, 4000); // Match the fade-out duration

        // Cleanup timer
        return () => clearTimeout(timer);
    }, [debugTrigger]); // Run the effect every time `debugTrigger` changes

    return (
        <div
            ref={containerRef} // Attach the container to the ref
            className="fixed bottom-0 w-full p-2 font-mono pointer-events-none"
        >
            {/* Debug messages are dynamically appended here */}
        </div>
    );
}
