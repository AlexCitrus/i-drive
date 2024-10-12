import React, { createContext, useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import {
  setOrigin,
  setNearbyRides,
  setRide,
  addCompletedRide
} from "../slices/navSlice";
import {
  fetchNearbyRideRequests,
  acceptRide,
  declineRide,
  startRide,
  dropOffRide
} from "../api/ride";
import { RIDE_STATUS_TO_SHOW } from "../util/constants";
import useAddress from "../hooks/useAddress";

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

const extractFormattedAddress = (address) => {
  return address[0]
    ? `${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].country}`
    : "Unknown location";
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const dispatch = useDispatch();

  const { getAddressFromCoordinates } = useAddress();

  const fetchLocationAndRides = async () => {
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
    const formattedAddress = extractFormattedAddress(address);

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

    // Fetch addresses for each ride and filter rides based on valid statuses
    const ridesWithAddresses = await Promise.all(
      rides
        .filter((ride) => RIDE_STATUS_TO_SHOW.includes(ride.status))
        .map(async (ride) => {
          const rideAddress = await Location.reverseGeocodeAsync({
            latitude: ride.pickupLocation.latitude,
            longitude: ride.pickupLocation.longitude
          });

          const formattedRideAddress = extractFormattedAddress(rideAddress);

          return { ...ride, address: formattedRideAddress };
        })
    );

    dispatch(setNearbyRides(ridesWithAddresses));
  };

  const onAcceptRide = async (rideId) => {
    try {
      if (!currentLocation) {
        throw new Error("Current location not available");
      }
      const updatedRides = await acceptRide(rideId);
      const acceptedRide = updatedRides.find((ride) => ride.id === rideId);
      if (!acceptedRide) {
        throw new Error("Accepted ride not found in updated rides");
      }

      // Fetch and add the rider's address to the accepted ride
      const rideAddress = await Location.reverseGeocodeAsync({
        latitude: acceptedRide.pickupLocation.latitude,
        longitude: acceptedRide.pickupLocation.longitude
      });

      const formattedRideAddress = extractFormattedAddress(rideAddress);

      const acceptedRideWithAddress = {
        ...acceptedRide,
        address: formattedRideAddress
      };

      dispatch(setRide(acceptedRideWithAddress));
      dispatch(
        setNearbyRides(
          updatedRides.map((ride) =>
            ride.id === rideId ? acceptedRideWithAddress : ride
          )
        )
      );
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

  const onDeclineRide = async (rideId) => {
    try {
      if (!currentLocation) {
        throw new Error("Current location not available");
      }
      const updatedRides = await declineRide(rideId);
      const declinedRide = updatedRides.find((ride) => ride.id === rideId);
      if (!declinedRide) {
        throw new Error("Declined ride not found in updated rides");
      }

      const ridesWithAddresses = await Promise.all(
        updatedRides
          .filter((ride) => RIDE_STATUS_TO_SHOW.includes(ride.status))
          .map(async (ride) => {
            const rideAddress = await Location.reverseGeocodeAsync({
              latitude: ride.pickupLocation.latitude,
              longitude: ride.pickupLocation.longitude
            });

            const formattedRideAddress = extractFormattedAddress(rideAddress);

            return { ...ride, address: formattedRideAddress };
          })
      );

      dispatch(setNearbyRides(ridesWithAddresses));

      dispatch(setRide(null)); // Clear the selected ride
    } catch (error) {
      console.error("Error declining ride:", error);
      throw error;
    }
  };

  const onStartRide = async (rideId) => {
    try {
      if (!currentLocation) {
        throw new Error("Current location not available");
      }
      const updatedRides = await startRide(rideId);
      const startedRide = updatedRides.find((ride) => ride.id === rideId);
      if (!startedRide) {
        throw new Error("Started ride not found in updated rides");
      }

      // Fetch and add the destination address using getAddressFromCoordinates
      const formattedDestinationAddress = await getAddressFromCoordinates(
        startedRide.destination.latitude,
        startedRide.destination.longitude
      );

      const updatedRideInProgress = {
        ...startedRide,
        pickupTime: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true
        }),
        destinationAddress: formattedDestinationAddress
      };

      dispatch(setRide(updatedRideInProgress));
      dispatch(
        setNearbyRides(
          updatedRides.map((ride) =>
            ride.id === rideId ? updatedRideInProgress : ride
          )
        )
      );
    } catch (error) {
      console.error("Error starting ride:", error);
      throw error;
    }
  };

  const onDropOffRider = async (rideId) => {
    try {
      if (!currentLocation) {
        throw new Error("Current location not available");
      }
      const updatedRides = await dropOffRide(rideId);
      const completedRide = updatedRides.find((ride) => ride.id === rideId);
      if (!completedRide) {
        throw new Error("Completed ride not found in updated rides");
      }

      // Fetch and add the destination address using getAddressFromCoordinates
      const formattedDestinationAddress = await getAddressFromCoordinates(
        completedRide.destination.latitude,
        completedRide.destination.longitude
      );

      const dropOffTime = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });

      const updatedCompletedRide = {
        ...completedRide,
        dropOffTime,
        destinationAddress: formattedDestinationAddress
      };

      dispatch(addCompletedRide(updatedCompletedRide));
      dispatch(setRide(null)); // Clear the selected ride

      const ridesWithAddresses = await Promise.all(
        updatedRides
          .filter((ride) => RIDE_STATUS_TO_SHOW.includes(ride.status))
          .map(async (ride) => {
            const rideAddress = await Location.reverseGeocodeAsync({
              latitude: ride.pickupLocation.latitude,
              longitude: ride.pickupLocation.longitude
            });

            const formattedRideAddress = extractFormattedAddress(rideAddress);

            return { ...ride, address: formattedRideAddress };
          })
      );

      dispatch(setNearbyRides(ridesWithAddresses));
    } catch (error) {
      console.error("Error dropping off rider:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchLocationAndRides();
  }, [dispatch]);

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        currentAddress,
        onAcceptRide,
        onDeclineRide,
        onStartRide,
        onDropOffRider,
        fetchLocationAndRides
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
