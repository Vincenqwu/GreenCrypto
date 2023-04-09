import { MAPS_API_KEY } from "@env";

export const getAddressFromCoords = async (coords) => {
  if (!coords) {
    return "No location selected";
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${MAPS_API_KEY}`;

  try {
    const response = await fetch(url);

    const data = await response.json();
    // console.log(data);
    if (!data || data.status === "ZERO_RESULTS") {
      return null;
    }
    const fullAddress = data.results[0].formatted_address;
    const res = fullAddress.split(",")[1];

    return res.trim();
  } catch (err) {
    console.log("fetch address error: ", err);
  }
};
