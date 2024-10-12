import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { RIDE_STATUS } from "../../util/constants";
import useMap from "../../hooks/useMap";

const Map = () => {
  const { selectedRide, nearbyRides, currentLocation, currentAddress, mapRef } =
    useMap();

  const initialRegion = {
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  };

  const renderCurrentLocationMarker = () => (
    <Marker
      coordinate={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      }}
      title="Current Location"
      description={currentAddress}
      identifier="currentLocation"
      pinColor="green"
    />
  );

  const renderNearbyRideMarkers = () =>
    nearbyRides.map((ride) => (
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
    ));

  const renderSelectedRideMarkers = () => (
    <>
      <Marker
        coordinate={{
          latitude: selectedRide.pickupLocation.latitude,
          longitude: selectedRide.pickupLocation.longitude
        }}
        title="Pickup Location"
        description={selectedRide.address || "Pickup point"}
        pinColor="blue"
      />
      <Marker
        coordinate={{
          latitude: selectedRide.destination.latitude,
          longitude: selectedRide.destination.longitude
        }}
        title="Destination"
        description={selectedRide.destinationAddress || "Destination point"}
        pinColor="red"
      />
    </>
  );

  const getDirectionsOrigin = () =>
    selectedRide.status === RIDE_STATUS.ACCEPTED
      ? {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        }
      : {
          latitude: selectedRide.pickupLocation.latitude,
          longitude: selectedRide.pickupLocation.longitude
        };

  const getDirectionsDestination = () =>
    selectedRide.status === RIDE_STATUS.ACCEPTED
      ? {
          latitude: selectedRide.pickupLocation.latitude,
          longitude: selectedRide.pickupLocation.longitude
        }
      : {
          latitude: selectedRide.destination.latitude,
          longitude: selectedRide.destination.longitude
        };

  return (
    <View style={tw`flex-1`}>
      {currentLocation ? (
        <MapView
          style={tw`flex-1`}
          mapType="mutedStandard"
          initialRegion={initialRegion}
          ref={mapRef}
        >
          {currentLocation && renderCurrentLocationMarker()}
          {renderNearbyRideMarkers()}
          {selectedRide && (
            <>
              {renderSelectedRideMarkers()}
              <MapViewDirections
                origin={getDirectionsOrigin()}
                destination={getDirectionsDestination()}
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
