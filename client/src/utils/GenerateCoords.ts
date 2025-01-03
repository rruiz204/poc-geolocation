export const GenerateCoords = () => {
  const lat = (Math.random() * 180 - 90).toFixed(4);
  const lon = (Math.random() * 360 - 180).toFixed(4);
  return { lat: parseFloat(lat), lon: parseFloat(lon) };
};