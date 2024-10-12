import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import { selectRide } from "../../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { RIDE_STATUS } from "../../util/constants";
import RideInfo from "../resources/RideInfo";
import RideActions from "../resources/RideActions";

export default function RideDetails() {
  const selectedRide = useSelector(selectRide);
  const navigation = useNavigation();

  if (!selectedRide) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg font-semibold`}>No ride selected</Text>
      </View>
    );
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <View
          style={tw`bg-white p-5 border-b border-gray-200 z-10 flex-row items-center justify-center`}
        >
          <TouchableOpacity
            onPress={handleGoBack}
            style={tw`absolute left-5 z-50 p-3 rounded-full`}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>

          <Text style={tw`text-xl font-bold`}>
            {selectedRide.status === RIDE_STATUS.STARTED
              ? "Ongoing Ride"
              : "Ride Details"}
          </Text>
        </View>

        <ScrollView contentContainerStyle={tw`grow p-5`}>
          <RideInfo />
        </ScrollView>

        <RideActions />
      </View>
    </SafeAreaView>
  );
}
