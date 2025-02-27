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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessible={true}
          accessibilityLabel="Go back"
        >
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Confirm Purchase</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.ticketSummary}>
          <ThemedText style={styles.sectionTitle}>Ticket Summary</ThemedText>
          <View style={styles.ticketCard}>
            <View
              style={[styles.ticketBadge, { backgroundColor: ticket.color }]}
            >
              <Text style={styles.ticketBadgeText}>{ticket.name}</Text>
            </View>
            <Text style={styles.ticketPrice}>${ticket.price}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email</Text>
          <TextInput
            style={styles.input}
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
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => {
            if (!method.available) return null;
            const IconComponent = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
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

        <View style={styles.priceBreakdown}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Ticket Price</Text>
            <Text style={styles.priceValue}>${ticket.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>${fees.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  ticketSummary: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
  },
  ticketCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
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
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedPayment: {
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
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    color: "#666",
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
    color: "#4F46E5",
  },
  footer: {
    padding: 16,
    backgroundColor: "white",
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
