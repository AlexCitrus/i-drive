import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { useSelector } from "react-redux";
import { selectCompletedRides } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { RIDE_STATUS } from "../util/constants";
import { useNavigation } from "@react-navigation/native";

const History = () => {
  const [completedRides, setCompletedRides] = useState([]);
  const rides = useSelector(selectCompletedRides);
  const navigation = useNavigation();

  useEffect(() => {
    const droppedOffRides = rides.filter(
      (ride) => ride.status === RIDE_STATUS.DROPPED_OFF
    );
    setCompletedRides(droppedOffRides);
  }, [rides]);

  const renderRideItem = ({ item }) => (
    <TouchableOpacity
      style={tw`flex-row items-center bg-gray-100 rounded-lg mb-4 p-4`}
    >
      {console.log(item)}
      <Icon
        name="car"
        type="font-awesome"
        color="#3B82F6"
        size={24}
        containerStyle={tw`mr-4`}
      />
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-bold mb-1`}>{item.userName}</Text>
        <Text style={tw`text-sm text-gray-600 mb-1`}>
          {item.destinationAddress}
        </Text>
        <Text style={tw`text-xs text-gray-500`}>{item.dropOffTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center justify-center my-5`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute left-4`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold text-center`}>Ride History</Text>
      </View>
      {completedRides.length > 0 ? (
        <FlatList
          data={completedRides}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`px-4`}
        />
      ) : (
        <Text style={tw`text-lg text-center text-gray-600 mt-5`}>
          No completed rides yet.
        </Text>
      )}
    </SafeAreaView>
  );
};

export default History;
