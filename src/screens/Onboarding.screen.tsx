import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  Animated,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: "1",
    title: "Fresh Food",
    description:
      "We make it simple to find the food you crave. Enter your address and let us do the rest.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    tag: "🍕 1000+ Restaurants",
  },
  {
    id: "2",
    title: "Fast Delivery",
    description:
      "Hot and fresh food delivered directly to your doorstep in minutes, guaranteed.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
    tag: "⚡ Avg. 30 min delivery",
  },
  {
    id: "3",
    title: "Easy Payment",
    description:
      "We make food ordering fast, simple and free no matter if you order online or cash.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
    tag: "🔒 100% Secure",
  },
];

const CIRCLE_SIZE = 56;

const Onboarding = () => {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("authStack");
    }
  };

  const isLast = currentIndex === ONBOARDING_DATA.length - 1;

  const renderItem = ({ item }: { item: (typeof ONBOARDING_DATA)[0] }) => (
    <View style={styles.slide}>
      {/* Image card */}
      <View style={styles.imageCard}>
        <Image
          source={{ uri: item.image }}
          style={styles.illustration}
          resizeMode="cover"
        />
        {/* Tag pill overlapping bottom of image */}
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      </View>

      {/* Text */}
      <View style={styles.textArea}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F3" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandDot} />
          <Text style={styles.brandName}>FoodRush</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("authStack")}
          style={({ pressed }) => [styles.skipBtn, pressed && { opacity: 0.5 }]}
        >
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* Slides */}
      <FlatList
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={16}
        style={styles.flatList}
      />

      {/* Bottom: dots + CTA */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.paginator}>
          {ONBOARDING_DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i.toString()}
                style={[styles.dot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>

        {/* CTA row */}
        <View style={styles.ctaRow}>
          <View style={styles.stepLabel}>
            <Text style={styles.stepCurrent}>{currentIndex + 1}</Text>
            <Text style={styles.stepTotal}>/{ONBOARDING_DATA.length}</Text>
          </View>

          <Pressable
            onPress={scrollToNext}
            style={({ pressed }) => [
              styles.nextBtn,
              isLast && styles.nextBtnFull,
              pressed && styles.nextBtnPressed,
            ]}
          >
            <Text style={styles.nextBtnLabel}>
              {isLast ? "Get Started →" : "Next →"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F3",
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FC8019",
  },
  brandName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#181C2E",
    letterSpacing: -0.3,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#F0EBE3",
    borderRadius: 20,
  },
  skipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FC8019",
  },

  flatList: {
    flex: 1,
  },

  /* Slide */
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.02,
  },

  /* Image card */
  imageCard: {
    width: "100%",
    height: height * 0.42,
    borderRadius: 28,
    overflow: "visible",
    position: "relative",
  },
  illustration: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    backgroundColor: "#E8E8E8",
  },
  tagPill: {
    position: "absolute",
    bottom: -14,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 99,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F5EFE9",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#181C2E",
  },

  /* Text area */
  textArea: {
    marginTop: height * 0.055,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#181C2E",
    marginBottom: 12,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  description: {
    fontSize: 15,
    color: "#686B78",
    lineHeight: 24,
    maxWidth: 300,
  },

  /* Bottom */
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 44,
    paddingTop: 24,
    gap: 24,
  },
  paginator: {
    flexDirection: "row",
    alignItems: "center",
    height: 8,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FC8019",
  },

  /* CTA Row */
  ctaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepLabel: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  stepCurrent: {
    fontSize: 28,
    fontWeight: "800",
    color: "#181C2E",
  },
  stepTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A0A5BA",
  },
  nextBtn: {
    backgroundColor: "#FC8019",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#FC8019",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  nextBtnFull: {
    paddingHorizontal: 40,
  },
  nextBtnPressed: {
    backgroundColor: "#E36B00",
    transform: [{ scale: 0.97 }],
  },
  nextBtnLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
