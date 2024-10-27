export const currentLocation = async (lat, lon) => {
  const request = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  );
  const data = await request.json();
  console.log(await data);
};
