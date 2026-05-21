import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { restaurantData } from "../restaurantData";
import { MenuItem } from "../types/Restraunt.types";
import useUserContext from "../hooks/useContext.hook";
import { Ionicons } from "@expo/vector-icons";

const RestaurantDetail = () => {
  const navigation = useNavigation<any>();
  const { cartItems, setCartItems } = useUserContext();

  const route = useRoute<any>();
  const { id } = route.params;
  const restaurantDetails = restaurantData[+id - 1];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [qty, setQty] = useState(1);

  const openMenuModal = (item: MenuItem) => {
    setSelectedItem(item);
    setQty(1);
    setModalVisible(true);
  };

  const handleGoToCart = () => {
    setModalVisible(false);
    setCartItems([
      ...cartItems,
      { item: selectedItem!, qty, restaurant: restaurantDetails },
    ]);
    navigation.navigate("cart", {
      item: selectedItem,
      qty,
      restaurant: restaurantDetails,
    });
  };

  const renderHeroSection = () => (
    <View style={styles.heroContainer}>
      <Image source={{ uri: restaurantDetails.image }} style={styles.heroImage} />
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={24} color="#181C2E" />
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{restaurantDetails.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {restaurantDetails.rating}</Text>
          </View>
        </View>

        <Text style={styles.cuisineText}>{restaurantDetails.cuisine}</Text>

        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>{restaurantDetails.deliveryTime}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.detailText}>{restaurantDetails.distance}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.detailText}>₹{restaurantDetails.priceForTwo} for two</Text>
        </View>
      </View>
    </View>
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <Pressable style={styles.menuCard} onPress={() => openMenuModal(item)}>
      <View style={styles.menuInfo}>
        <View style={[styles.vegIcon, { borderColor: item.isVeg ? "#0F8A65" : "#E43B4F" }]}>
          <View style={[styles.vegDot, { backgroundColor: item.isVeg ? "#0F8A65" : "#E43B4F" }]} />
        </View>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodPrice}>₹{item.price}</Text>
        <View style={styles.menuRating}>
          <Ionicons name="star" size={12} color="#E36B00" />
          <Text style={styles.menuRatingText}>{item.rating}</Text>
        </View>
        <Text style={styles.foodDesc} numberOfLines={2}>{item.description}</Text>
      </View>

      <View style={styles.menuImageContainer}>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <TouchableOpacity style={styles.addButton} onPress={() => openMenuModal(item)}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurantDetails.menu}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeroSection}
        renderItem={renderMenuItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)} />
          <View style={styles.modalContainer}>
            {selectedItem && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Customize Item</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle-outline" size={28} color="#A0A5BA" />
                  </TouchableOpacity>
                </View>

                <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />
                
                <View style={styles.modalDetails}>
                  <Text style={styles.modalItemName}>{selectedItem.name}</Text>
                  <Text style={styles.modalItemPrice}>₹{selectedItem.price}</Text>
                </View>

                <View style={styles.qtyContainer}>
                  <Text style={styles.qtyLabel}>Quantity</Text>
                  <View style={styles.qtyControls}>
                    <TouchableOpacity 
                      style={styles.qtyBtn} 
                      onPress={() => qty > 1 && setQty(qty - 1)}
                    >
                      <Ionicons name="remove" size={20} color="#FC8019" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{qty}</Text>
                    <TouchableOpacity 
                      style={styles.qtyBtn} 
                      onPress={() => setQty(qty + 1)}
                    >
                      <Ionicons name="add" size={20} color="#FC8019" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.cartButton} onPress={handleGoToCart}>
                  <Text style={styles.cartButtonText}>Add to Cart - ₹{selectedItem.price * qty}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContainer: {
    paddingBottom: 40,
  },
  heroContainer: {
    marginBottom: 20,
    backgroundColor: "#F8F9FA",
  },
  heroImage: {
    width: "100%",
    height: 250,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: -40,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
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
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F5FA",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 13,
    color: "#32343E",
    fontWeight: "600",
  },
  dot: {
    marginHorizontal: 8,
    color: "#686B78",
    fontSize: 12,
  },
  menuCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 12,
  },
  separator: {
    height: 12,
    backgroundColor: "transparent",
  },
  menuInfo: {
    flex: 1,
    paddingRight: 16,
  },
  vegIcon: {
    width: 14,
    height: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginBottom: 6,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#32343E",
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#32343E",
    marginBottom: 6,
  },
  menuRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  menuRatingText: {
    fontSize: 12,
    color: "#E36B00",
    fontWeight: "600",
    marginLeft: 4,
  },
  foodDesc: {
    fontSize: 13,
    color: "#686B78",
    lineHeight: 18,
  },
  menuImageContainer: {
    width: 110,
    height: 110,
    position: "relative",
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  addButton: {
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#0F8A65",
    fontWeight: "800",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end", // Bottom sheet effect
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#181C2E",
  },
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  modalDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalItemName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#32343E",
    flex: 1,
  },
  modalItemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FC8019",
  },
  qtyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "#F0F5FA",
    padding: 16,
    borderRadius: 12,
  },
  qtyLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#32343E",
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F5FA",
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#32343E",
    marginHorizontal: 16,
  },
  cartButton: {
    backgroundColor: "#FC8019",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
