import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

const RestaurantDetail = () => {
  const navigation = useNavigation();
  const handleGoToCart = () => {
    navigation.navigate("cart");
  };
  return (
    <View>
      <Text>RestaurantDetail</Text>
      <Button onPress={handleGoToCart}>Got to cart</Button>
    </View>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({});
