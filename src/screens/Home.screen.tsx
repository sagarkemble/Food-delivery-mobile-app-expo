import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Restaurant } from "../types/Restraunt.types";
import { restaurantData } from "../restaurantData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useUserContext from "../hooks/useContext.hook";

const Home = () => {
  const navigation = useNavigation<any>();
  const { name } = useUserContext();
  const [activeFilter, setActiveFilter] = useState("Both");

  const displayName = name ? name.split(" ")[0] : "Guest";

  // 1. Update the handlePress function to accept an ID
  const handlePress = (id: string) => {
    // Pass the ID as a route parameter
    navigation.navigate("restaurantDetail", { id });
  };

  const handleAvatar = () => {
    navigation.navigate("profileDrawer");
  };

  const filteredRestaurants = restaurantData.filter((restaurant) => {
    if (activeFilter === "Pure Veg") return restaurant.isVeg === true;
    if (activeFilter === "Non Veg") return restaurant.isVeg === false;
    return true; // "Both"
  });

  const renderCard = (restaurant: Restaurant) => {
    return (
      <TouchableOpacity
        key={restaurant.id}
        style={styles.restrauntCard}
        onPress={() => handlePress(restaurant.id)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: restaurant.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
            </View>
          </View>

          <Text style={styles.cuisineText} numberOfLines={1}>
            {restaurant.cuisine}
          </Text>

          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{restaurant.deliveryTime}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.detailText}>{restaurant.distance}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.detailText}>
              ₹{restaurant.priceForTwo} for two
            </Text>
          </View>

          <View style={styles.vegContainer}>
            <View
              style={[
                styles.vegIcon,
                { borderColor: restaurant.isVeg ? "#0F8A65" : "#E43B4F" },
              ]}
            >
              <View
                style={[
                  styles.vegDot,
                  { backgroundColor: restaurant.isVeg ? "#0F8A65" : "#E43B4F" },
                ]}
              />
            </View>
            <Text style={styles.vegText}>
              {restaurant.isVeg ? "PURE VEG" : "NON VEG"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      {/* Search Bar UI */}
      <TouchableOpacity
        style={styles.searchContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("search")}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color="#A0A5BA"
          style={styles.searchIcon}
        />
        <Text style={styles.searchText}>
          Search for restaurants, items or more
        </Text>
      </TouchableOpacity>

      {/* Visual Filters Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersScroll}
        style={styles.filtersWrapper}
      >
        {["Both", "Pure Veg", "Non Veg"].map((filter, index) => {
          const isActive = activeFilter === filter;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Restaurants to explore</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleAvatar}>
            <Image
              source={{
                uri: "https://ik.imagekit.io/yn9gz2n2g/Avatars/Common/common154.png?updatedAt=1754971126428",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.greetingText}>Good morning,</Text>
            <Text style={styles.userNameText}>{displayName}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bellIconContainer}>
          <Ionicons name="notifications-outline" size={24} color="#181C2E" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRestaurants}
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#F0F5FA",
  },
  greetingText: {
    fontSize: 13,
    color: "#686B78",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 0,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#181C2E",
    marginTop: -4,
  },
  bellIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E43B4F",
    borderWidth: 1.5,
    borderColor: "#F0F5FA",
  },
  listHeader: {
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F5FA",
    marginHorizontal: 16,
    marginTop: 8,
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    flex: 1,
    color: "#A0A5BA",
    fontSize: 15,
    fontWeight: "500",
  },
  filtersWrapper: {
    marginTop: 16,
  },
  filtersScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: "#FFF3E8",
    borderColor: "#FC8019",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#32343E",
  },
  filterTextActive: {
    color: "#FC8019",
  },
  sectionTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
    letterSpacing: -0.2,
  },
  listContainer: {
    paddingBottom: 24,
    backgroundColor: "#F8F9FA",
  },
  restrauntCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#E8E8E8",
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    backgroundColor: "#0F8A65",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  cuisineText: {
    fontSize: 14,
    color: "#686B78",
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 13,
    color: "#535665",
    fontWeight: "500",
  },
  dot: {
    marginHorizontal: 8,
    color: "#686B78",
    fontSize: 12,
  },
  vegContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  vegIcon: {
    width: 14,
    height: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    borderRadius: 2,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  vegText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#686B78",
    letterSpacing: 0.5,
  },
});
