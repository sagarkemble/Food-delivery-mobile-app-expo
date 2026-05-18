import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack.navigator";
import ProfileDrawer from "./ProfileDrawer.navigator";
import Search from "../screens/Search.screen";
import Orders from "../screens/Orders.screen";

const tab = createBottomTabNavigator();

export const MainTab = () => {
  return (
    <tab.Navigator>
      <tab.Screen name="homeStack" component={HomeStack} />
      <tab.Screen name="search" component={Search} />
      <tab.Screen name="orders" component={Orders} />
      <tab.Screen name="profileDrawer" component={ProfileDrawer} />
    </tab.Navigator>
  );
};

export default MainTab;
