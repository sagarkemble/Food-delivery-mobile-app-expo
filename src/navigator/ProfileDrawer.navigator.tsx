import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screens/Profile.screen";
import Help from "../screens/Help.screen";
import Settings from "../screens/Settings.screen";
import useUserContext from "../hooks/useContext.hook";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { name, email, setIsLoggedIn } = useUserContext();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Drawer Header */}
        <View style={styles.drawerHeader}>
          <Image
            source={{
              uri: "https://ik.imagekit.io/yn9gz2n2g/Avatars/Common/common154.png?updatedAt=1754971126428",
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{name || "Guest User"}</Text>
          <Text style={styles.userEmail}>{email || "guest@example.com"}</Text>
        </View>

        <View style={styles.drawerItemsWrapper}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Logout Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setIsLoggedIn(false)}
        >
          <Ionicons name="log-out-outline" size={22} color="#E43B4F" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, 
        drawerActiveBackgroundColor: "#FFF3E8",
        drawerActiveTintColor: "#FC8019",
        drawerInactiveTintColor: "#32343E",
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
          marginLeft: -10,
        },
        drawerItemStyle: {
          borderRadius: 12,
          paddingHorizontal: 8,
          marginBottom: 4,
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#F8F9FA",
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F5FA",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
  },
  userEmail: {
    fontSize: 13,
    color: "#A0A5BA",
    marginTop: 4,
  },
  drawerItemsWrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: "#F0F5FA",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E43B4F",
    marginLeft: 12,
  },
});
