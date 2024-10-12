import React, { createContext, useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setOrigin, setNearbyRides } from "../slices/navSlice";
import { fetchNearbyRideRequests } from "../api/ride";

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      // Get address from coordinates
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      // Format address
      const formattedAddress = address[0]
        ? `${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
        : "Unknown location";

      // Set current address
      setCurrentAddress(formattedAddress);

      // Set origin in Redux store
      dispatch(
        setOrigin({
          location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude
          },
          description: formattedAddress
        })
      );

      // Fetch nearby ride requests
      const rides = await fetchNearbyRideRequests(
        location.coords.latitude,
        location.coords.longitude
      );

      // Fetch addresses for each ride
      const ridesWithAddresses = await Promise.all(
        rides.map(async (ride) => {
          const rideAddress = await Location.reverseGeocodeAsync({
            latitude: ride.pickupLocation.latitude,
            longitude: ride.pickupLocation.longitude
          });

          const formattedRideAddress = rideAddress[0]
            ? `${rideAddress[0].street}, ${rideAddress[0].city}, ${rideAddress[0].region}, ${rideAddress[0].country}`
            : "Unknown location";

          return { ...ride, address: formattedRideAddress };
        })
      );

      dispatch(setNearbyRides(ridesWithAddresses));
    })();
  }, [dispatch]);

  return (
    <LocationContext.Provider value={{ currentLocation, currentAddress }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
