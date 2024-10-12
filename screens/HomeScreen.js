import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const HomeScreen = () => {
  const origin = useSelector(selectOrigin);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://i.ibb.co/HnVqZBg/test.jpg"
          }}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Wingz</Text>
        {origin ? (
          <Text>Your origin: {origin.description}</Text>
        ) : (
          <Text>Set your origin to get started</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    padding: 20,
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  }
});
