import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn.screen";
import SignUp from "../screens/SignUp.screen";

const stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="signin" component={SignIn} />
      <stack.Screen name="signup" component={SignUp} />
    </stack.Navigator>
  );
};

export default AuthStack;
