import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding.screen";
import AuthStack from "./AuthStack.navigator";

const stack = createNativeStackNavigator();
const OnBoardingStack = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="onBoarding" component={Onboarding} />
      <stack.Screen name="authStack" component={AuthStack} />
    </stack.Navigator>
  );
};

export default OnBoardingStack;
