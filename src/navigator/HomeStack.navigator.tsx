import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RestaurantDetail from "../screens/RestaurantDetail.screen";
import Home from "../screens/Home.screen";
import Cart from "../screens/Cart.screen";

const stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="home" component={Home} />
      <stack.Screen name="restaurantDetail" component={RestaurantDetail} />
      <stack.Screen name="cart" component={Cart} />
    </stack.Navigator>
  );
};

export default HomeStack;
