let activeMessages = 0 // Keep track of active messages

export function createDebugMessage (message) {
  // Create a new div for the debug message
  const debugDiv = document.createElement('div')

  // Apply styles to the div
  debugDiv.textContent = message
  debugDiv.style.position = 'fixed'
  debugDiv.style.bottom = `${10 + activeMessages * 50}px` // Stack messages 50px apart
  debugDiv.style.left = '50%'
  debugDiv.style.transform = 'translateX(-50%)'
  debugDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  debugDiv.style.color = 'white'
  debugDiv.style.padding = '10px 20px'
  debugDiv.style.borderRadius = '5px'
  debugDiv.style.marginBottom = '10px'
  debugDiv.style.animation = 'fade-out 1s ease-out forwards' // Matches the fade-out duration
  debugDiv.style.zIndex = '1000'
  debugDiv.className = 'debug-message'

  // Append the div to the body
  document.body.appendChild(debugDiv)

  // Increment active messages
  activeMessages += 1

  // Remove the div after the animation ends
  setTimeout(() => {
    debugDiv.remove()
    activeMessages -= 1 // Decrement active messages
  }, 1000) // Match the animation duration (1 second)
}
