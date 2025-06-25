export default function getRandomInt (min, max) {
  min = Math.ceil(min) // Round up to the nearest whole number
  max = Math.floor(max) // Round down to the nearest whole number
  return Math.floor(Math.random() * (max - min + 1)) + min // Generate random integer
}
