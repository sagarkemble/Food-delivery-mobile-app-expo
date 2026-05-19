import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useUserContext from "../hooks/useContext.hook";

const Profile = () => {
  const navigation = useNavigation<any>();
  const { name, email, cartItems, orders } = useUserContext();

  const menuItems = [
    {
      title: "Help Center",
      icon: "help-circle-outline",
      onPress: () => navigation.navigate("Help"),
    },
    {
      title: "Settings",
      icon: "settings-outline",
      onPress: () => navigation.navigate("Settings"),
    },
    {
      title: "Open Drawer",
      icon: "menu-outline",
      onPress: () => navigation.openDrawer(),
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      onPress: () => console.log("Logout"),
      color: "#E43B4F",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.hamburgerBtn}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={28} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://ik.imagekit.io/yn9gz2n2g/Avatars/Common/common154.png?updatedAt=1754971126428",
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{name || "Guest User"}</Text>
          <Text style={styles.email}>{email || "guest@example.com"}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "#FFF3E8" }]}>
              <Ionicons name="receipt-outline" size={24} color="#FC8019" />
            </View>
            <Text style={styles.statNumber}>{orders ? orders.length : 0}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="cart-outline" size={24} color="#0F8A65" />
            </View>
            <Text style={styles.statNumber}>{cartItems ? cartItems.length : 0}</Text>
            <Text style={styles.statLabel}>Cart</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statBox}>
            <View style={[styles.statIconCircle, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="location-outline" size={24} color="#4A90E2" />
            </View>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Addresses</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.menuIconBox,
                      { backgroundColor: item.color ? `${item.color}15` : "#F0F5FA" },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={item.color || "#32343E"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.menuText,
                      item.color && { color: item.color },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
                </TouchableOpacity>
                {index < menuItems.length - 1 && (
                  <View style={styles.menuDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F8F9FA",
  },
  hamburgerBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E8E8E8",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  editBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FC8019",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#F8F9FA",
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A0A5BA",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A0A5BA",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#F0F0F0",
    height: "80%",
    alignSelf: "center",
  },
  menuContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A0A5BA",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#32343E",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F0F5FA",
    marginLeft: 72, // Aligns exactly with the text start
    marginRight: 16,
  },
});
