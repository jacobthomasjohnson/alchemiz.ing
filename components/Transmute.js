import ToolTip from "./ToolTip";
import getRandomInt from "../util/math";
import { useEffect, useState, useRef } from "react";

export function Transmute() {
    const [showVideo, setShowVideo] = useState(false);
    const [text, setText] = useState("Transmute");
    const [originalText, setOriginalText] = useState("Transmute"); // Keep track of the original text
    const [isTweaking, setIsTweaking] = useState(false);
    const videoRef = useRef(null); // Reference to the video element

    useEffect(() => {
        let timeout;

        const shuffleText = () => {
            const textArray = originalText.split(""); // Split the original text into an array
            const randomIndex1 = getRandomInt(0, textArray.length - 1);
            const randomIndex2 = getRandomInt(0, textArray.length - 1);

            // Swap two random letters
            [textArray[randomIndex1], textArray[randomIndex2]] = [
                textArray[randomIndex2],
                textArray[randomIndex1],
            ];

            setText(textArray.join("")); // Update the state with the shuffled text

            // Revert back to the original text after a short delay
            timeout = setTimeout(() => {
                setText(originalText);
            }, isTweaking ? 150 : 300);
        };

        const interval = setInterval(shuffleText, isTweaking ? 25 : 150); // Interval for shuffling text

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [originalText, isTweaking]); // Dependency on originalText to avoid issues

    useEffect(() => {
        if (showVideo && videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error("Video autoplay failed:", error);
            });
        }
    }, [showVideo]); // Attempt to play the video when showVideo changes

    return (
        <div
            onMouseOver={() => {
                setIsTweaking(true);
                setShowVideo(true);
            }}
            onMouseOut={() => {
                setIsTweaking(false);
                setShowVideo(false);
            }}
            className={`text-center justify-center mt-2 p-12 bg-[#1a1a1a] hover:cursor-pointer hover:bg-transparent relative overflow-hidden hover:drop-shadow-sm hover:text-background hover:font-extrabold`}
        >
            {text}
            <div
                className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500 saturate-[20%] contrast-[35%] ${
                    showVideo ? "opacity-100" : "opacity-0"
                }`}
            >
                <video
                    ref={videoRef}
                    className="absolute min-w-full min-h-full object-cover"
                    muted
                    loop
                >
                    <source src="/transmute2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
