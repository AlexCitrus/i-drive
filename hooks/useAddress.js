import { useState } from "react";
import * as Location from "expo-location";

const useAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    setIsLoading(true);
    setError(null);

    try {
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (addressResponse && addressResponse.length > 0) {
        const address = addressResponse[0];
        const formattedAddress = `${address.street || ""}, ${address.city || ""}, ${address.region || ""}, ${address.country || ""}`;
        setIsLoading(false);
        return formattedAddress.replace(/^,\s*/, "").replace(/,\s*$/, "");
      } else {
        throw new Error("No address found for the given coordinates");
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  return { getAddressFromCoordinates, isLoading, error };
};

export default useAddress;
