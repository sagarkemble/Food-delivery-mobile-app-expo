import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import useUserContext from "../hooks/useContext.hook";

const SignIn = () => {
  const navigation = useNavigation();
  const { isLoggedIn, setIsLoggedIn } = useUserContext();
  const handleSignIn = () => {
    setIsLoggedIn(true);
  };
  const handleSignUp = () => {
    navigation.navigate("signup");
  };
  return (
    <View>
      <Button onPress={handleSignIn}>Sign In</Button>
      <Button onPress={handleSignUp}>Sign Up</Button>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
