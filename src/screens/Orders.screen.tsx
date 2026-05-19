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

const Orders = () => {
  const navigation = useNavigation<any>();
  const { orders } = useUserContext();

  const renderOrderItem = ({ item: orderItem }: { item: CartItem }) => {
    const { item, qty, restaurant } = orderItem;
    const itemTotalPrice = item.price * qty;

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          {/* Top: name + status */}
          <View style={styles.topRow}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>

          {/* Restaurant */}
          <View style={styles.restaurantRow}>
            <Ionicons name="storefront-outline" size={12} color="#A0A5BA" />
            <Text style={styles.restaurantName} numberOfLines={1}>
              {"  "}
              {restaurant.name}
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom: qty + price */}
          <View style={styles.bottomRow}>
            <View style={styles.qtyPill}>
              <Text style={styles.qtyText}>Qty: {qty}</Text>
            </View>
            <Text style={styles.totalPrice}>₹{itemTotalPrice}</Text>
            <TouchableOpacity style={styles.rateBtn}>
              <Ionicons name="star" size={12} color="#FC8019" />
              <Text style={styles.rateBtnText}>Rate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 40 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="receipt-outline" size={60} color="#A0A5BA" />
          </View>
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't placed any orders. Discover restaurants and
            start ordering!
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.popToTop();
              } else {
                navigation.navigate("homeStack");
              }
            }}
          >
            <Text style={styles.browseText}>Browse Food</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.orderCount}>
            {orders.length} Past Order{orders.length > 1 ? "s" : ""}
          </Text>

          <FlatList
            data={orders}
            keyExtractor={(orderItem, index) => `${orderItem.item.id}-${index}`}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Orders;

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
  orderCount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A0A5BA",
    paddingHorizontal: 20,
    paddingBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  /* Empty State */
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

  /* List */
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 14,
  },

  /* Card */
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    height: 120,
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
    justifyContent: "space-between",
    gap: 6,
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: "#181C2E",
    lineHeight: 20,
  },
  statusBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#2E7D32",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  restaurantRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  restaurantName: {
    fontSize: 12,
    color: "#A0A5BA",
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyPill: {
    backgroundColor: "#F0F5FA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#686B78",
  },
  totalPrice: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: "#181C2E",
  },
  rateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  rateBtnText: {
    color: "#FC8019",
    fontSize: 12,
    fontWeight: "700",
  },
});
