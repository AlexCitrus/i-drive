import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectRide, selectNearbyRides } from "../slices/navSlice";
import { useLocation } from "../contexts/LocationContext";
import { RIDE_STATUS } from "../util/constants";

const useMap = () => {
  const selectedRide = useSelector(selectRide);
  const nearbyRides = useSelector(selectNearbyRides);
  const { currentLocation, currentAddress } = useLocation();
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      if (selectedRide) {
        if (selectedRide.status === RIDE_STATUS.ACCEPTED && currentLocation) {
          mapRef.current.fitToCoordinates(
            [
              {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              },
              {
                latitude: selectedRide.pickupLocation.latitude,
                longitude: selectedRide.pickupLocation.longitude
              }
            ],
            {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true
            }
          );
        } else if (selectedRide.status === RIDE_STATUS.STARTED) {
          // Extract pickup and destination coordinates from the selected ride
          const { latitude: pickupLat, longitude: pickupLong } =
            selectedRide.pickupLocation;
          const { latitude: destLat, longitude: destLong } =
            selectedRide.destination;

          // Calculate the angle between pickup and destination points
          // This will be used to set the map's heading
          const angle =
            (Math.atan2(destLat - pickupLat, destLong - pickupLong) * 245) /
            Math.PI;

          // Animate the camera to focus on the ride's pickup location
          // with a tilted view and oriented towards the destination
          mapRef.current.animateCamera(
            {
              center: {
                latitude: pickupLat,
                longitude: pickupLong
              },
              pitch: 70, // Tilt the camera 45 degrees
              heading: angle, // Orient the map towards the destination
              zoom: 18, // Set a high zoom level for detailed view
              altitude: 300 // Set the camera altitude
            },
            { duration: 1000 } // Animate over 1 second
          );
        } else {
          mapRef.current.fitToCoordinates(
            [
              {
                latitude: selectedRide.pickupLocation.latitude,
                longitude: selectedRide.pickupLocation.longitude
              },
              {
                latitude: selectedRide.destination.latitude,
                longitude: selectedRide.destination.longitude
              }
            ],
            {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true
            }
          );
        }
      } else if (currentLocation) {
        mapRef.current.animateToRegion(
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          },
          1000
        );
      }
    }
  }, [selectedRide, currentLocation]);

  return {
    selectedRide,
    nearbyRides,
    currentLocation,
    currentAddress,
    mapRef
  };
};

export default useMap;
