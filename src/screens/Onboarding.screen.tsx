import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Onboarding</Text>
      <Pressable onPress={() => navigation.navigate("authStack")}>
        <Text>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
