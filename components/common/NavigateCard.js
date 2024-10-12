import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setRide, selectNearbyRides, selectRide } from "../../slices/navSlice";
import calculateDistance from "../../util/calculateDistance";
import { useLocation } from "../../contexts/LocationContext";
import useAddress from "../../hooks/useAddress";
import { RIDE_STATUS } from "../../util/constants";

const NavigateCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const nearbyRides = useSelector(selectNearbyRides);
  const selectedRide = useSelector(selectRide);
  const { currentLocation } = useLocation();
  const { getAddressFromCoordinates } = useAddress();

  const handleRideSelection = async (item) => {
    let destinationAddress = "Unknown destination";
    if (item.destination) {
      try {
        destinationAddress = await getAddressFromCoordinates(
          item.destination.latitude,
          item.destination.longitude
        );
      } catch (error) {
        console.error("Error getting destination address:", error);
      }
    }

    const updatedItem = {
      ...item,
      destinationAddress
    };

    dispatch(setRide(updatedItem));
    navigation.navigate("RideDetails", { ride: updatedItem });
  };

  const isRideInProgress =
    selectedRide &&
    (selectedRide.status === RIDE_STATUS.ACCEPTED ||
      selectedRide.status === RIDE_STATUS.STARTED);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl font-bold text-gray-800`}>
          {isRideInProgress ? "Current Ride" : "Select a rider"}
        </Text>
      </View>
      {isRideInProgress ? (
        <View style={tw`flex-1 justify-center items-center p-5`}>
          <Icon
            name="car"
            type="font-awesome"
            size={50}
            color="#000"
            style={tw`mb-5`}
          />
          <Text style={tw`text-lg font-semibold mb-2`}>Ride in Progress</Text>
          <Text style={tw`text-center text-gray-600`}>
            You are currently on a ride. Head to the ride details for more
            information.
          </Text>
          <TouchableOpacity
            style={tw`mt-5 bg-black py-3 px-8 rounded-full`}
            onPress={() =>
              navigation.navigate("RideDetails", { ride: selectedRide })
            }
          >
            <Text style={tw`text-white font-semibold`}>View Ride Details</Text>
          </TouchableOpacity>
        </View>
      ) : currentLocation ? (
        <FlatList
          data={nearbyRides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`border-b border-gray-200 p-4`}
              onPress={() => handleRideSelection(item)}
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
          )}
        />
      ) : (
        <Text style={tw`text-center py-5`}>Please set your location first</Text>
      )}
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
