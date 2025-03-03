import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import {
  CreditCard,
  ChevronLeft,
  Apple,
  CreditCardIcon,
  HandCoins,
  WalletMinimal,
} from "lucide-react-native";
import { router } from "expo-router";
import { ThemedText } from "../../../components/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../../../components/ThemedView";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { neutral800, neutral900 } from "../../../constants/Colors";

export default function PurchaseScreen({ route, navigation }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const ticket = {
    name: "Premium",
    price: 99.99,
    color: "#7C3AED",
  };

  const fees = 12.99;
  const total = ticket.price + fees;

  const paymentCardsColor = useThemeColor(
    { light: "white", dark: neutral800 },
    "background"
  );

  const totalPriceBg = useThemeColor(
    { light: "#4F46E5", dark: "#60a5fa" },
    "background"
  );

  const paymentCardsBorder = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit Card",
      icon: CreditCardIcon,
      available: true,
    },
    {
      id: "momo",
      name: "Momo",
      icon: WalletMinimal,
      available: true,
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: HandCoins,
      available: true,
    },
  ];

  const handlePurchase = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }

    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert(
        "Success!",
        "Your ticket has been purchased. Check your email for confirmation.",
        [{ text: "OK", onPress: () => router.replace("Home") }]
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={[
        styles.container,
        { marginTop: insets.top, marginBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessible={true}
          accessibilityLabel="Go back"
        >
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Confirm Purchase</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.ticketSummary}>
          <ThemedText style={styles.sectionTitle}>Ticket Summary</ThemedText>
          <View
            style={[styles.ticketCard, { backgroundColor: paymentCardsColor }]}
          >
            <View
              style={[styles.ticketBadge, { backgroundColor: ticket.color }]}
            >
              <Text style={styles.ticketBadgeText}>{ticket.name}</Text>
            </View>
            <ThemedText style={styles.ticketPrice}>${ticket.price}</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Email</ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: paymentCardsColor,
                borderColor: paymentCardsBorder,
              },
            ]}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            accessible={true}
            accessibilityLabel="Email input field"
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
          {paymentMethods.map((method) => {
            if (!method.available) return null;
            const IconComponent = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  { backgroundColor: paymentCardsColor },
                  selectedPaymentMethod === method.id && styles.selectedPayment,
                ]}
                onPress={() => setSelectedPaymentMethod(method.id)}
                accessible={true}
                accessibilityLabel={`Select ${method.name}`}
                accessibilityState={{
                  selected: selectedPaymentMethod === method.id,
                }}
              >
                <IconComponent
                  size={24}
                  color={
                    selectedPaymentMethod === method.id ? "#4F46E5" : "#666"
                  }
                />
                <Text
                  style={[
                    styles.paymentMethodText,
                    selectedPaymentMethod === method.id &&
                      styles.selectedPaymentText,
                  ]}
                >
                  {method.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={[
            styles.priceBreakdown,
            { backgroundColor: paymentCardsColor },
          ]}
        >
          <ThemedText style={styles.sectionTitle}>Price Breakdown</ThemedText>
          <View style={styles.priceRow}>
            <ThemedText type="desc" style={styles.priceLabel}>
              Ticket Price
            </ThemedText>
            <ThemedText style={styles.priceValue}>
              ${ticket.price.toFixed(2)}
            </ThemedText>
          </View>
          <View style={styles.priceRow}>
            <ThemedText type="desc" style={styles.priceLabel}>
              Service Fee
            </ThemedText>
            <ThemedText style={styles.priceValue}>
              ${fees.toFixed(2)}
            </ThemedText>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <ThemedText style={styles.totalLabel}>Total</ThemedText>
            <Text style={[styles.totalValue, { color: totalPriceBg }]}>
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <ThemedView lightColor="white" style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            (!selectedPaymentMethod || !email || isProcessing) &&
              styles.purchaseButtonDisabled,
          ]}
          onPress={handlePurchase}
          disabled={!selectedPaymentMethod || !email || isProcessing}
          accessible={true}
          accessibilityLabel="Complete purchase"
          accessibilityState={{
            disabled: !selectedPaymentMethod || !email || isProcessing,
          }}
        >
          <CreditCard color="white" size={20} style={styles.purchaseIcon} />
          <Text style={styles.purchaseButtonText}>
            {isProcessing ? "Processing..." : "Complete Purchase"}
          </Text>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  ticketSummary: {
    padding: 16,
    marginBottom: 16,
  },
  ticketCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
  },
  ticketBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ticketBadgeText: {
    color: "white",
    fontWeight: "bold",
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,

    borderRadius: 8,
    marginBottom: 8,
  },
  selectedPayment: {
    borderWidth: 1,
    borderColor: "#4F46E5",
    backgroundColor: "#F5F3FF",
  },
  paymentMethodText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#666",
  },
  selectedPaymentText: {
    color: "#4F46E5",
    fontWeight: "500",
  },
  priceBreakdown: {
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding: 16,

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
});
