import React from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "123",
    title: "Look for riders",
    image:
      "https://i.ibb.co/ygXHtZf/Pngtree-business-person-illustration-commuting-to-3785096.png",
    screen: "MapScreen"
  }
];

const NavOptions = () => {
  const origin = useSelector(selectOrigin);
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
          style={tw`p-4 pl-8 pb-10 pt-6 bg-gray-200 m-2 w-80`}
        >
          <View>
            <Image
              style={{ width: 240, height: 240, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw`mt-4 text-xl font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-3 bg-black rounded-full w-14 mt-6`}
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
