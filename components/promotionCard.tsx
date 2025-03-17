import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// component function for special offers
const RenderPromotionCard = ({ item, index }) => {
  const promotionOpacity = new Animated.Value(1);
  const scrollX = new Animated.Value(0);
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.promotionCard,
        {
          backgroundColor: item.backgroundColor,
          transform: [{ scale }],
          opacity: promotionOpacity,
        },
      ]}
    >
      <View style={styles.promotionContent}>
        <View style={styles.promotionIconContainer}>
          <Ionicons name={item.icon} size={24} color={item.textColor} />
        </View>
        <View style={styles.promotionDetails}>
          <Text style={[styles.promotionTitle, { color: item.textColor }]}>
            {item.title}
          </Text>
          <Text style={styles.promotionDescription}>{item.description}</Text>
          <Text style={styles.promotionExpiry}>{item.expiryDate}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.promotionButton, { backgroundColor: item.textColor }]}
      >
        <Text style={styles.promotionButtonText}>View Offer</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RenderPromotionCard;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  promotionCard: {
    width: width - 40,
    marginRight: 15,
    borderRadius: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  promotionContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  promotionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  promotionDetails: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 5,
  },
  promotionExpiry: {
    fontSize: 12,
    color: "#6B7280",
  },
  promotionButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  promotionButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
