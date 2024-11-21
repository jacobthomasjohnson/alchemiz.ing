import { useEffect, useState, useRef } from 'react'
import useGameStore from '@/store/gameStore'

// Easing function for cubic-bezier
function cubicBezier (p0, p1, p2, p3) {
  return function (t) {
    const u = 1 - t
    return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
  }
}

function getRandomInt (min, max) {
  // Ensure the inputs are integers
  min = Math.ceil(min)
  max = Math.floor(max)

  // Generate a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Define an easing curve (you can experiment with these control points)
const easeOut = cubicBezier(0, 1, 0, 1)

let animationFrameId

export function startFractalAnimation() {
      const canvas = document.getElementById('shardCanvas');
      const ctx = canvas.getContext('2d');
    
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    
      const level = useGameStore.getState().level;
    
      const shards = [];
      const shardCount = 1000; // Adjust for your desired density
      const duration = 1000; // Duration of animation in ms
      const startTime = performance.now();
    
      // Cancel any ongoing animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      }
    
      // Generate shards with random properties
      for (let i = 0; i < shardCount; i++) {
        shards.push({
          x: Math.random() * canvas.width, // Random starting point across the page
          y: Math.random() * canvas.height,
          angle: -Math.PI / 2, // Always move straight up
          speed: Math.random() * 2000 + 50, // Reasonable speed
          size: Math.random() * 1 + 2, // Random size
          baseColor: 'rgba(173, 216, 230,' // Light blue
        });
      }
    
      function animate(timestamp) {
        const elapsed = timestamp - startTime;
    
        if (elapsed > duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
          return;
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const progress = Math.min(elapsed / duration, 1); // Progress [0, 1]
    
        // Draw each shard
        shards.forEach((shard) => {
          const distance = shard.speed * progress; // Adjust distance with easing
          const x = shard.x + Math.cos(shard.angle) * distance;
          const y = shard.y + Math.sin(shard.angle) * distance;
    
          // Calculate fading opacity
          const opacity = 1 - progress; // Fade from 1 to 0
    
          // Draw the shard as a small line
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(shard.angle) * shard.size,
            y + Math.sin(shard.angle) * shard.size
          );
          ctx.strokeStyle = `${shard.baseColor} ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
    
        animationFrameId = requestAnimationFrame(animate);
      }
    
      animationFrameId = requestAnimationFrame(animate); // Start the animation
    }
    

export function Transmute () {
  const [text, setText] = useState('Transmute')
  const transmute = useGameStore(state => state.transmute)

  const [showVideo, setShowVideo] = useState(false)
  const [originalText, setOriginalText] = useState('Transmute') // Keep track of the original text
  const [isTweaking, setIsTweaking] = useState(false)
  const videoRef = useRef(null) // Reference to the video element

  useEffect(() => {
    let timeout

    const shuffleText = () => {
      const textArray = originalText.split('') // Split the original text into an array
      const randomIndex1 = getRandomInt(0, textArray.length - 1)
      const randomIndex2 = getRandomInt(0, textArray.length - 1)

      // Swap two random letters
      ;[textArray[randomIndex1], textArray[randomIndex2]] = [
        textArray[randomIndex2],
        textArray[randomIndex1]
      ]

      setText(textArray.join('')) // Update the state with the shuffled text

      // Revert back to the original text after a short delay
      timeout = setTimeout(
        () => {
          setText(originalText)
        },
        isTweaking ? 150 : 300
      )
    }

    const interval = setInterval(shuffleText, isTweaking ? 25 : 150) // Interval for shuffling text

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [originalText, isTweaking]) // Dependency on originalText to avoid issues

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video autoplay failed:', error)
      })
    }
  }, [showVideo]) // Attempt to play the video when showVideo changes

  const handleTransmute = () => {
    transmute() // Run the transmute logic
    startFractalAnimation() // Trigger the fractal animation

    // Stop and restart panel animations
    const panels = document.querySelectorAll('.transmute-flash')
    panels.forEach(panel => {
      // Reset ongoing animations
      panel.style.animation = 'none'

      // Force reflow to restart animation
      void panel.offsetWidth // Triggers reflow

      // Start the flash-border animation
      panel.style.animation = 'flash-border 0.5s ease-out'

      panel.addEventListener(
        'animationend',
        () => {
          panel.style.animation = '' // Reset after animation ends
        },
        { once: true } // Ensure the listener runs only once
      )
    })
  }

  return (
    <>
      <div
        onMouseOver={() => {
          setIsTweaking(true)
          setShowVideo(true)
        }}
        onMouseOut={() => {
          setIsTweaking(false)
          setShowVideo(false)
        }}
        onClick={handleTransmute}
        className={`text-center transmute-flash justify-center mt-2 p-12 bg-[#1a1a1a] hover:cursor-pointer hover:bg-transparent relative overflow-hidden hover:drop-shadow-sm hover:text-background hover:font-extrabold`}
      >
        {text}
        <div
          className={`absolute transmute-flash top-0 left-0 right-0 bottom-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-500 saturate-[50%] contrast-[50%] ${
            showVideo ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            ref={videoRef}
            className='absolute min-w-full min-h-full object-cover'
            muted
            loop
          >
            <source src='/transmute_video.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <canvas
        id='shardCanvas'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Ensure it's on top of other elements
          pointerEvents: 'none', // Allow interactions with underlying content
          className: 'transmute-flash',
        }}
      ></canvas>
    </>
  )
}
