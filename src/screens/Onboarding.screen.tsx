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
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: "1",
    title: "Fresh Food",
    description:
      "We make it simple to find the food you crave. Enter your address and let us do the rest.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Fast Delivery",
    description:
      "Hot and fresh food delivered directly to your doorstep in minutes, guaranteed.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Easy Payment",
    description:
      "We make food ordering fast, simple and free no matter if you order online or cash.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
  },
];

const CIRCLE_SIZE = 64;

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
      {/* Illustration area */}
      <View style={styles.illustrationArea}>
        <View style={styles.circleBackdrop} />
        <Image
          source={{ uri: item.image }}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* Text */}
      <View style={styles.textArea}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Skip top-right */}
      <View style={styles.header}>
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

      {/* Dots + circular next button */}
      <View style={styles.bottom}>
        <View style={styles.paginator}>
          {ONBOARDING_DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.25, 1, 0.25],
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

        <Pressable
          onPress={scrollToNext}
          style={({ pressed }) => [
            styles.nextBtn,
            pressed && styles.nextBtnPressed,
          ]}
        >
          <Text style={styles.nextBtnLabel}>{isLast ? "✓" : "›"}</Text>
        </Pressable>
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

  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  skipText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FC8019",
  },

  flatList: {
    flex: 1,
  },

  slide: {
    width,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 32,
  },

  illustrationArea: {
    width: width * 0.78,
    height: height * 0.38,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  circleBackdrop: {
    position: "absolute",
    width: width * 0.68,
    height: width * 0.68,
    borderRadius: (width * 0.68) / 2,
    backgroundColor: "#FFE8D6",
  },
  illustration: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
  },

  textArea: {
    marginTop: height * 0.045,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1C1C1C",
    textAlign: "center",
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 15,
    color: "#686B78",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
  },

  bottom: {
    alignItems: "center",
    paddingBottom: 44,
    paddingTop: 20,
    gap: 20,
  },
  paginator: {
    flexDirection: "row",
    alignItems: "center",
    height: 10,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FC8019",
  },

  nextBtn: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1.5,
    borderColor: "#FC8019",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#FC8019",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  nextBtnPressed: {
    backgroundColor: "#FC8019",
    transform: [{ scale: 0.95 }],
  },
  nextBtnLabel: {
    fontSize: 32,
    color: "#FC8019",
    fontWeight: "300",
    lineHeight: 38,
    marginTop: 2,
  },
});
