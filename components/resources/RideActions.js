import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectRide, setRide } from "../../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useLocation } from "../../contexts/LocationContext";
import { RIDE_STATUS } from "../../util/constants";

const RideActions = () => {
  const selectedRide = useSelector(selectRide);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { onAcceptRide, onDeclineRide, onStartRide, onDropOffRider } =
    useLocation();

  const handleAcceptRide = async () => {
    await onAcceptRide(selectedRide.id);
  };

  const handleDeclineRide = async () => {
    await onDeclineRide(selectedRide.id);
    dispatch(setRide(null));
    navigation.goBack();
  };

  const handlePickupRide = async () => {
    try {
      await onStartRide(selectedRide.id);
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };

  const handleDropOffRider = async () => {
    await onDropOffRider(selectedRide.id);
    dispatch(setRide(null));
    navigation.goBack();
  };

  if (!selectedRide) {
    return null;
  }

  return (
    <View style={tw`p-5`}>
      {selectedRide.status === RIDE_STATUS.STARTED ? (
        <TouchableOpacity
          style={tw`bg-red-500 py-4 px-6 rounded-full shadow-lg`}
          onPress={handleDropOffRider}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Drop Off Rider
          </Text>
        </TouchableOpacity>
      ) : selectedRide.status !== RIDE_STATUS.ACCEPTED ? (
        <View>
          <TouchableOpacity
            style={tw`bg-black py-4 px-6 rounded-full mb-3 shadow-lg`}
            onPress={handleAcceptRide}
          >
            <Text style={tw`text-white text-center text-lg font-semibold`}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-red-500 py-4 px-6 rounded-full shadow-lg`}
            onPress={handleDeclineRide}
          >
            <Text style={tw`text-white text-center text-lg font-semibold`}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={tw`bg-green-500 py-4 px-6 rounded-full shadow-lg`}
          onPress={handlePickupRide}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Pickup Rider
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RideActions;
