const getCoordinates = async (postalCode, country) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=${country}&format=json`
  );
  const data = await response.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    return { lat, lon };
  }
  throw new Error("No coordinates found");
};

export { getCoordinates };
