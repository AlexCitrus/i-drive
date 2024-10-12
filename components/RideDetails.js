import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectRide, setRide } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

export default function RideDetails() {
  const selectedRide = useSelector(selectRide);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  if (!selectedRide) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg font-semibold`}>No ride selected</Text>
      </View>
    );
  }

  const handleGoBack = () => {
    dispatch(setRide(null));
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <TouchableOpacity
        onPress={handleGoBack}
        style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
      >
        <Icon name="chevron-left" type="fontawesome" />
      </TouchableOpacity>

      <Text style={tw`text-center text-xl font-bold mb-5`}>Ride Details</Text>

      <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>
          Rider: {selectedRide.userName}
        </Text>
        <View style={tw`flex-row items-center mb-2`}>
          <Icon name="map-marker" type="font-awesome" size={24} color="green" />
          <Text style={tw`ml-2`}>{selectedRide.address}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Icon name="flag-checkered" type="font-awesome" size={24} />
          <Text style={tw`ml-2`}>
            {selectedRide.destination?.address || "Destination not set"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={tw`bg-black py-3 px-5 rounded-full`}
        onPress={() => {
          /* Handle accept ride */
        }}
      >
        <Text style={tw`text-white text-center text-lg`}>Accept Ride</Text>
      </TouchableOpacity>
    </View>
  );
}
