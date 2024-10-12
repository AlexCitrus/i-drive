import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import { selectRide, selectNearbyRides } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { useLocation } from "../contexts/LocationContext";
import { GOOGLE_MAPS_API_KEY } from "@env";

const Map = () => {
  const selectedRide = useSelector(selectRide);
  const nearbyRides = useSelector(selectNearbyRides);
  const { currentLocation, currentAddress } = useLocation();
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      if (selectedRide) {
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

  return (
    <View style={tw`flex-1`}>
      {currentLocation ? (
        <MapView
          style={tw`flex-1`}
          mapType="mutedStandard"
          initialRegion={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          ref={mapRef}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              }}
              title="Current Location"
              description={currentAddress}
              identifier="currentLocation"
              pinColor="red"
            />
          )}
          {nearbyRides.map((ride) => (
            <Marker
              key={ride.id}
              coordinate={{
                latitude: ride.pickupLocation.latitude,
                longitude: ride.pickupLocation.longitude
              }}
              title={`Ride ${ride.id}`}
              description={`${ride.address}\nStatus: ${ride.status}`}
              pinColor="blue"
            />
          ))}
          {selectedRide && (
            <>
              <Marker
                coordinate={{
                  latitude: selectedRide.destination.latitude,
                  longitude: selectedRide.destination.longitude
                }}
                title="Destination"
                description={
                  selectedRide.destinationAddress || "Destination point"
                }
                pinColor="red"
              />
              <MapViewDirections
                origin={{
                  latitude: selectedRide.pickupLocation.latitude,
                  longitude: selectedRide.pickupLocation.longitude
                }}
                destination={{
                  latitude: selectedRide.destination.latitude,
                  longitude: selectedRide.destination.longitude
                }}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="hotpink"
              />
            </>
          )}
        </MapView>
      ) : null}
    </View>
  );
};

export default Map;
