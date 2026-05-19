import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { restaurantData } from "../restaurantData";
import { Restaurant } from "../types/Restraunt.types";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Both");
  const navigation = useNavigation<any>();

  const getSearchResults = (): Restaurant[] => {
    let results = restaurantData;

    // Apply Veg/Non-Veg Filter
    if (activeFilter === "Pure Veg") {
      results = results.filter((r) => r.isVeg === true);
    } else if (activeFilter === "Non Veg") {
      results = results.filter((r) => r.isVeg === false);
    }

    // Apply Search Query Filter
    if (query.trim() !== "") {
      const lowerQuery = query.toLowerCase();
      results = results.filter((restaurant) => {
        const matchRestaurant =
          restaurant.name.toLowerCase().includes(lowerQuery) ||
          restaurant.cuisine.toLowerCase().includes(lowerQuery);

        const matchMenu = restaurant.menu.some((menuItem) =>
          menuItem.name.toLowerCase().includes(lowerQuery)
        );

        return matchRestaurant || matchMenu;
      });
    }

    return results;
  };

  const searchResults = getSearchResults();

  const handlePress = (id: string) => {
    navigation.navigate("homeStack", {
      screen: "restaurantDetail",
      params: { id },
    });
  };

  const renderCard = ({ item: restaurant }: { item: Restaurant }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handlePress(restaurant.id)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: restaurant.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
              <Ionicons name="star" size={10} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </View>
          </View>

          <Text style={styles.cuisineText} numberOfLines={1}>
            {restaurant.cuisine}
          </Text>

          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{restaurant.deliveryTime}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.detailText}>₹{restaurant.priceForTwo} for two</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#A0A5BA" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants, cuisines, or dishes..."
          placeholderTextColor="#A0A5BA"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="always"
          autoFocus={true}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
            <Ionicons name="close-circle" size={20} color="#A0A5BA" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
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
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results List */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        ListHeaderComponent={
          searchResults.length > 0 ? (
            <Text style={styles.resultCount}>
              {searchResults.length} result{searchResults.length > 1 ? "s" : ""}
            </Text>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={60} color="#F0F5FA" style={{ marginBottom: 16 }} />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn't find anything matching "{query}". Try searching for another restaurant or cuisine.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Search;

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
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 12,
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#181C2E",
    height: "100%",
  },
  clearBtn: {
    paddingLeft: 8,
  },
  filtersWrapper: {
    marginTop: 16,
    marginBottom: 8,
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
    paddingHorizontal: 16,
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  resultCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#A0A5BA",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 16,
    marginTop: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    height: 116,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: 108,
    height: "100%",
    backgroundColor: "#E8E8E8",
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  restaurantName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: "#181C2E",
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F8A65",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  cuisineText: {
    fontSize: 13,
    color: "#686B78",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 12,
    color: "#535665",
    fontWeight: "500",
  },
  dot: {
    marginHorizontal: 6,
    color: "#A0A5BA",
    fontSize: 12,
  },
  vegContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vegIcon: {
    width: 12,
    height: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    borderRadius: 2,
  },
  vegDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  vegText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#686B78",
    letterSpacing: 0.5,
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#A0A5BA",
    textAlign: "center",
    lineHeight: 20,
  },
});
