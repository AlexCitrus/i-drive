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
import { setRide, selectNearbyRides } from "../slices/navSlice";
import calculateDistance from "../util/calculateDistance";
import { useLocation } from "../contexts/LocationContext";

const NavigateCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const nearbyRides = useSelector(selectNearbyRides);
  const { currentLocation } = useLocation();

  const handleRideSelection = (item) => {
    dispatch(setRide(item));
    navigation.navigate("RideDetails", { ride: item });
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a rider</Text>
      </View>
      {currentLocation ? (
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
