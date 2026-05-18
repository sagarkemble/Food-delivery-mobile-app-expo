import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("restaurantDetail");
  };
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={handlePress}> Pizza hut </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
