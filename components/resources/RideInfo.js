import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectRide } from "../../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useLocation } from "../../contexts/LocationContext";
import { RIDE_STATUS } from "../../util/constants";

const RideInfo = () => {
  const selectedRide = useSelector(selectRide);
  const { currentAddress } = useLocation();

  if (!selectedRide) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg font-semibold`}>No ride selected</Text>
      </View>
    );
  }

  const renderRideDetails = () => {
    if (selectedRide.status === RIDE_STATUS.STARTED) {
      return (
        <>
          <View style={tw`flex-row items-start mb-4`}>
            <View style={tw`w-8 mr-4`}>
              <Icon name="clock" type="font-awesome-5" size={24} color="blue" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm text-gray-600 mb-1`}>Pickup Time</Text>
              <Text style={tw`text-base`}>
                {selectedRide.pickupTime || "Not available"}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row items-start`}>
            <View style={tw`w-8 mr-4`}>
              <Icon name="flag-checkered" type="font-awesome" size={24} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm text-gray-600 mb-1`}>Destination</Text>
              <Text style={tw`text-base`}>
                {selectedRide.destinationAddress || "Destination not set"}
              </Text>
            </View>
          </View>
        </>
      );
    } else if (selectedRide.status === RIDE_STATUS.ACCEPTED) {
      return (
        <>
          <View style={tw`flex-row items-start mb-4`}>
            <View style={tw`w-8 mr-4`}>
              <Icon
                name="map-marker"
                type="font-awesome"
                size={24}
                color="green"
              />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm text-gray-600 mb-1`}>Your Location</Text>
              <Text style={tw`text-base`}>{currentAddress}</Text>
            </View>
          </View>
          <View style={tw`flex-row items-start`}>
            <View style={tw`w-8 mr-4`}>
              <Icon
                name="map-marker"
                type="font-awesome"
                size={24}
                color="blue"
              />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm text-gray-600 mb-1`}>Rider Location</Text>
              <Text style={tw`text-base`}>{selectedRide.address}</Text>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={tw`flex-row items-start mb-4`}>
            <View style={tw`w-8 mr-4`}>
              <Icon
                name="map-marker"
                type="font-awesome"
                size={24}
                color="blue"
              />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm text-gray-600 mb-1`}>
                Pickup Location
              </Text>
              <Text style={tw`text-base`}>{selectedRide.address}</Text>
            </View>
          </View>
          <View style={tw`flex-row items-start`}>
            <View style={tw`w-8 mr-4`}>
              <Icon name="flag-checkered" type="font-awesome" size={24} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-sm text-gray-600 mb-1`}>Destination</Text>
              <Text style={tw`text-base`}>
                {selectedRide.destinationAddress || "Destination not set"}
              </Text>
            </View>
          </View>
        </>
      );
    }
  };

  return (
    <View style={tw`bg-gray-100 p-6 rounded-xl shadow-md mb-6`}>
      {renderRideDetails()}
    </View>
  );
};

export default RideInfo;
