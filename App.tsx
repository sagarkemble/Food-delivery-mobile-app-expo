import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import OnBoardingStack from "./src/navigator/OnboardingStack.navigator";
import MainTab from "./src/navigator/MainTab.navigator";
import { UserProvider, UserContext } from "./src/context/User.context";

const AppNavigator = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTab /> : <OnBoardingStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </>
  );
}
