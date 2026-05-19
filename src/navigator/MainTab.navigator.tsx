import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack.navigator";
import ProfileDrawer from "./ProfileDrawer.navigator";
import Search from "../screens/Search.screen";
import Orders from "../screens/Orders.screen";

const tab = createBottomTabNavigator();

export const MainTab = () => {
  return (
    <tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "homeStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "orders") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "profileDrawer") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FC8019",
        tabBarInactiveTintColor: "#686B78",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E8E8E8",
          paddingBottom: 6,
          paddingTop: 60,
          // height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <tab.Screen
        name="homeStack"
        component={HomeStack}
        options={{ tabBarLabel: "Home" }}
      />
      <tab.Screen
        name="search"
        component={Search}
        options={{ tabBarLabel: "Search" }}
      />
      <tab.Screen
        name="orders"
        component={Orders}
        options={{ tabBarLabel: "Orders" }}
      />
      <tab.Screen
        name="profileDrawer"
        component={ProfileDrawer}
        options={{ tabBarLabel: "Profile" }}
      />
    </tab.Navigator>
  );
};

export default MainTab;
