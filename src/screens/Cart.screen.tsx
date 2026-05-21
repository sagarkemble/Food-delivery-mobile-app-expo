import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useUserContext from "../hooks/useContext.hook";
import { CartItem } from "../types/Restraunt.types";

const Cart = () => {
  const navigation = useNavigation<any>();
  const { cartItems, setCartItems, setOrders } = useUserContext();

  const handleRemove = (indexToRemove: number) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleBuySingle = (itemToBuy: CartItem, indexToRemove: number) => {
    setOrders((prev) => [...prev, itemToBuy]);
    handleRemove(indexToRemove);
  };

  const handleBuyAll = () => {
    setOrders((prev) => [...prev, ...cartItems]);
    setCartItems([]);
  };

  const grandTotal = cartItems.reduce(
    (total, current) => total + current.item.price * current.qty,
    0
  );

  const renderCartItem = ({
    item: cartItem,
    index,
  }: {
    item: CartItem;
    index: number;
  }) => {
    const { item, qty, restaurant } = cartItem;
    const itemTotalPrice = item.price * qty;

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <View style={styles.topRow}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemove(index)}
              style={styles.removeBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={14} color="#A0A5BA" />
            </TouchableOpacity>
          </View>

          <View style={styles.restaurantRow}>
            <Ionicons name="storefront-outline" size={11} color="#A0A5BA" />
            <Text style={styles.restaurantName} numberOfLines={1}>
              {"  "}{restaurant.name}
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          <View style={styles.bottomRow}>
            <View style={styles.qtyPill}>
              <Text style={styles.qtyText}>× {qty}</Text>
            </View>
            <Text style={styles.totalPrice}>₹{itemTotalPrice}</Text>
            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => handleBuySingle(cartItem, index)}
            >
              <Text style={styles.buyBtnText}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cart-outline" size={60} color="#A0A5BA" />
          </View>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.browseText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.itemCount}>
            {cartItems.length} item{cartItems.length > 1 ? "s" : ""}
          </Text>

          <FlatList
            data={cartItems}
            keyExtractor={(cartItem, index) =>
              `${cartItem.item.id}-${index}`
            }
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.bottomBar}>
            <View style={styles.grandTotalInfo}>
              <Text style={styles.grandTotalLabel}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>₹{grandTotal}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleBuyAll}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;

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
  itemCount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A0A5BA",
    paddingHorizontal: 20,
    paddingBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#A0A5BA",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: "#FC8019",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  browseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 14,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    height: 116,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: 108,
    height: "100%",
    backgroundColor: "#E8E8E8",
  },
  info: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: "#181C2E",
    lineHeight: 19,
  },
  removeBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },

  restaurantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  restaurantName: {
    fontSize: 12,
    color: "#A0A5BA",
    fontWeight: "500",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyPill: {
    backgroundColor: "#FFF3E8",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 99,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FC8019",
  },
  totalPrice: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: "#181C2E",
  },
  buyBtn: {
    backgroundColor: "#FC8019",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buyBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 10,
  },
  grandTotalInfo: {
    flex: 1,
  },
  grandTotalLabel: {
    fontSize: 12,
    color: "#A0A5BA",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  grandTotalValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#181C2E",
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: "#FC8019",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#FC8019",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});