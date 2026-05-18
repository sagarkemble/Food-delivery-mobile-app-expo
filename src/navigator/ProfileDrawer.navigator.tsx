import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, View } from "react-native";
import Profile from "../screens/Profile.screen";
import Help from "../screens/Help.screen";
import Settings from "../screens/Settings.screen";
import useUserContext from "../hooks/useContext.hook";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { setIsLoggedIn } = useUserContext();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <Button title="Logout" onPress={() => setIsLoggedIn(false)} />
      </View>
    </DrawerContentScrollView>
  );
};

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
