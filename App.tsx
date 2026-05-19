import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import OnBoardingStack from "./src/navigator/OnboardingStack.navigator";
import MainTab from "./src/navigator/MainTab.navigator";
import { UserProvider, UserContext } from "./src/context/User.context";
// Import SafeAreaProvider alongside SafeAreaView
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaProvider
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <StatusBar style="dark" />
      <UserProvider>
        {/* Wrap your navigator in SafeAreaView with flex: 1 */}
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaView>
      </UserProvider>
    </SafeAreaProvider>
  );
}
