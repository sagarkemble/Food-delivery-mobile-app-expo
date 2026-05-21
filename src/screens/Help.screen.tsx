import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Help = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#A0A5BA" />
          <TextInput
            placeholder="Search for topics or questions"
            placeholderTextColor="#A0A5BA"
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {[
            "How to track my order?",
            "Can I cancel my order?",
            "Payment methods accepted",
            "Refund policy",
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.faqItem}>
              <Text style={styles.faqText}>{item}</Text>
              <Ionicons name="chevron-down-outline" size={20} color="#A0A5BA" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Still need help?</Text>
        <View style={styles.contactContainer}>
          <TouchableOpacity style={styles.contactCard}>
            <Ionicons name="chatbubbles-outline" size={28} color="#FF6C44" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactSub}>Usually responds in 5 mins</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <Ionicons name="mail-outline" size={28} color="#FF6C44" />
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactTitle}>Send an Email</Text>
              <Text style={styles.contactSub}>support@fooddelivery.com</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Help;

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#181C2E",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 16,
  },
  faqContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F5FA",
  },
  faqText: {
    fontSize: 15,
    color: "#32343E",
    fontWeight: "500",
  },
  contactContainer: {
    paddingBottom: 20,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contactTextContainer: {
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#181C2E",
    marginBottom: 4,
  },
  contactSub: {
    fontSize: 13,
    color: "#A0A5BA",
  },
});
