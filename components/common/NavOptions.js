import React from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "123",
    title: "Look for riders",
    image:
      "https://i.ibb.co/ygXHtZf/Pngtree-business-person-illustration-commuting-to-3785096.png",
    screen: "MapScreen"
  },
  {
    id: "456",
    title: "My Rides",
    image: "https://i.ibb.co/5RjchBg/car-icon.png",
    screen: "History"
  }
];

const NavOptions = () => {
  const navigation = useNavigation();

  const onPress = (item) => navigation.navigate(item.screen);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
