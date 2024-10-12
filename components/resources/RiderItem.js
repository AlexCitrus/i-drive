import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import calculateDistance from "../../util/calculateDistance";

const RiderItem = ({ item, onPress, currentLocation }) => {
  return (
    <TouchableOpacity
      style={tw`border-b border-gray-200 p-4`}
      onPress={() => onPress(item)}
    >
      <Text style={tw`font-semibold text-lg`}>{item.userName}</Text>
      <Text>{item.address}</Text>
      <Text>
        {calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          item.pickupLocation.latitude,
          item.pickupLocation.longitude
        )}{" "}
        km away
      </Text>
    </TouchableOpacity>
  );
};

export default RiderItem;
