import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { CreditCard, Star, Award, Crown } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedView } from "../../../components/ThemedView";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { neutral800, neutral900 } from "../../../constants/Colors";

export default function Payment() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const tickets = [
    {
      id: "1",
      name: "Basic",
      price: 49.99,
      icon: Star,
      features: [
        "General admission",
        "Standard seating",
        "Access to main event",
      ],
      color: "#4F46E5",
    },
    {
      id: "2",
      name: "Premium",
      price: 99.99,
      icon: Award,
      features: [
        "Priority seating",
        "Exclusive merchandise",
        "Meet & greet access",
        "Complimentary drinks",
      ],
      color: "#7C3AED",
    },
    {
      id: "3",
      name: "VIP",
      price: 199.99,
      icon: Crown,
      features: [
        "Front row seating",
        "Backstage access",
        "Private lounge access",
        "Professional photo op",
        "Exclusive after-party",
      ],
      color: "#C026D3",
    },
  ];

  const handlePurchase = () => {
    // Handle purchase logic here
    console.log(`Purchasing ${selectedTier} ticket`);
  };

  const cardBg = useThemeColor(
    { light: "white", dark: neutral900 },
    "background"
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <ThemedText style={styles.header}>Select Your Ticket</ThemedText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <ThemedView>
          {tickets.map((ticket) => {
            const IconComponent = ticket.icon;
            const isSelected = selectedTier === ticket.id;

            return (
              <TouchableOpacity
                key={ticket.id}
                style={[
                  styles.ticketCard,
                  isSelected && styles.selectedCard,
                  {
                    backgroundColor: cardBg,
                  },
                ]}
                onPress={() => setSelectedTier(ticket.id)}
                accessible={true}
                accessibilityLabel={`${ticket.name} ticket option, ${ticket.price} dollars`}
                accessibilityState={{ selected: isSelected }}
              >
                <ThemedView lightColor="white" darkColor="#171717">
                  <View style={styles.ticketHeader}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: ticket.color },
                      ]}
                    >
                      <IconComponent color="white" size={24} />
                    </View>
                    <View>
                      <ThemedText style={styles.tierName}>
                        {ticket.name}
                      </ThemedText>
                      <ThemedText
                        lightColor="#262626"
                        darkColor="#e5e7eb"
                        style={styles.price}
                      >
                        ${ticket.price}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.featuresContainer}>
                    {ticket.features.map((feature, index) => (
                      <ThemedText
                        lightColor="#262626"
                        darkColor="#9ca3af"
                        key={index}
                        style={styles.feature}
                      >
                        • {feature}
                      </ThemedText>
                    ))}
                  </View>
                </ThemedView>
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      </ScrollView>
      <ThemedView style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            !selectedTier && styles.purchaseButtonDisabled,
          ]}
          onPress={handlePurchase}
          disabled={!selectedTier}
          accessible={true}
          accessibilityLabel="Purchase ticket"
          accessibilityState={{ disabled: !selectedTier }}
        >
          <CreditCard color="white" size={20} style={styles.purchaseIcon} />
          <Text style={styles.purchaseButtonText}>Purchase Ticket</Text>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  scrollView: {
    padding: 20,
  },
  ticketCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#4F46E5",
  },
  ticketHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tierName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
  },
  featuresContainer: {
    marginLeft: 8,
  },
  feature: {
    fontSize: 14,

    marginBottom: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  purchaseButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  purchaseButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  purchaseIcon: {
    marginRight: 8,
  },
  purchaseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(154, 154, 154, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 16,
    zIndex: 1,
    padding: 8,
  },
});
