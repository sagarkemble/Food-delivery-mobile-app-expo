import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useUserContext from "../hooks/useContext.hook";

const Settings = () => {
  const navigation = useNavigation<any>();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { setIsLoggedIn } = useUserContext();
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderItem = (
    icon: any,
    title: string,
    type: "arrow" | "toggle" | "none" = "arrow",
    value?: boolean,
    onValueChange?: (val: boolean) => void,
    textColor: string = "#181C2E",
    onPress?: () => void,
  ) => {
    return (
      <TouchableOpacity
        style={styles.settingItem}
        activeOpacity={type === "toggle" ? 1 : 0.7}
        onPress={onPress}
      >
        <View style={styles.itemLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={20} color="#686B78" />
          </View>
          <Text style={[styles.itemTitle, { color: textColor }]}>{title}</Text>
        </View>

        {type === "arrow" && (
          <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
        )}
        {type === "toggle" && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: "#E5E7EB", true: "#FC8019" }}
            thumbColor={"#FFFFFF"}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          {renderItem("person-outline", "Personal Information")}
          <View style={styles.divider} />
          {renderItem("card-outline", "Payment Methods")}
          <View style={styles.divider} />
          {renderItem("location-outline", "Saved Addresses")}
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          {renderItem(
            "notifications-outline",
            "Push Notifications",
            "toggle",
            pushEnabled,
            setPushEnabled,
          )}
          <View style={styles.divider} />
          {renderItem(
            "moon-outline",
            "Dark Mode",
            "toggle",
            darkMode,
            setDarkMode,
          )}
          <View style={styles.divider} />
          {renderItem("globe-outline", "Language")}
        </View>

        <Text style={styles.sectionTitle}>Support & More</Text>
        <View style={styles.card}>
          {renderItem("help-circle-outline", "Help Center")}
          <View style={styles.divider} />
          {renderItem("document-text-outline", "Terms & Conditions")}
          <View style={styles.divider} />
          {renderItem(
            "log-out-outline",
            "Log Out",
            "none",
            undefined,
            undefined,
            "#FF4B4B",
            handleLogout,
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#A0A5BA",
    textTransform: "uppercase",
    marginBottom: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F5FA",
    marginLeft: 50,
  },
});
