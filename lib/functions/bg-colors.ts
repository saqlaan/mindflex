export function generateBackgroundColor() {
  // Predefined harmonious and bright HSL colors that contrast well with black text
  const colors = [
    "hsla(220, 78.80%, 48.00%, 0.57)", // Blue
    "hsla(9, 81.10%, 45.70%, 0.48)", // Yellow
    "hsl(47, 38.70%, 87.80%)", // Green
    "hsl(43, 4.10%, 66.50%)", // Red
  ];

  // Randomly pick one of the predefined colors
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}
