export function generateBackgroundColor() {
  // Generate a random hue (0 to 360 degrees)
  const hue = Math.floor(Math.random() * 360);

  // Set saturation to a high value (colorful)
  const saturation = 80; // 0 to 100%

  // Randomly select lightness for contrast, ensure it's not too dark or too light for black text
  const lightness = Math.floor(Math.random() * 40) + 40; // Range from 40 to 80

  // Generate the HSL color
  const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return backgroundColor;
}
