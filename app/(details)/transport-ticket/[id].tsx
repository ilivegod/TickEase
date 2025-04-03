import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  ArrowLeft,
  Bus,
  Train,
  TramFrontIcon as Tram,
  Clock,
  Calendar,
  CreditCard,
  Check,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function TicketScreen() {
  const [selectedTier, setSelectedTier] = useState<string>("standard");

  const ticketDetails = {
    route: "Downtown - Central Station",
    validFrom: "April 3, 2025",
    validUntil: "April 3, 2025",
    transportTypes: ["bus", "train", "tram"],
  };

  const ticketTiers = [
    {
      id: "economy",
      name: "Economy",
      price: 2.5,
      features: ["Basic transport", "Valid for 1 hour", "No transfers"],
      color: "#f97316", // Orange
      gradient: ["#ff9966", "#ff5e62"],
    },
    {
      id: "standard",
      name: "Standard",
      price: 4.0,
      features: [
        "All transport types",
        "Valid for 2 hours",
        "Unlimited transfers",
      ],
      color: "#10b981", // Emerald
      gradient: ["#0cebeb", "#20e3b2"],
    },
    {
      id: "premium",
      name: "Premium",
      price: 7.5,
      features: [
        "All transport types",
        "Valid for 24 hours",
        "Unlimited transfers",
        "Priority boarding",
      ],
      color: "#6366f1", // Purple
      gradient: ["#a18cd1", "#fbc2eb"],
    },
  ];

  const handleBuy = () => {
    const selectedTicket = ticketTiers.find((tier) => tier.id === selectedTier);
    alert(
      `Purchasing ${
        selectedTicket?.name
      } ticket for $${selectedTicket?.price.toFixed(2)}`
    );
    // Here you would integrate with payment processing
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Purchase Ticket</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Ticket Details */}
        <View style={styles.ticketDetailsCard}>
          <View style={styles.ticketStub}>
            <View style={styles.stubCircleTop} />
            <View style={styles.stubLine} />
            <View style={styles.stubCircleBottom} />
          </View>

          <View style={styles.ticketContent}>
            <Text style={styles.sectionTitle}>Ticket Details</Text>

            <View style={styles.routeContainer}>
              <Text style={styles.routeText}>{ticketDetails.route}</Text>
              <View style={styles.routeLine}>
                <View style={styles.routeDot} />
                <View style={styles.routePath} />
                <View style={styles.routeDot} />
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Calendar size={18} color="#666" />
                <Text style={styles.detailValue}>
                  Valid from: {ticketDetails.validFrom}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Clock size={18} color="#666" />
                <Text style={styles.detailValue}>
                  Valid until: {ticketDetails.validUntil}
                </Text>
              </View>
            </View>

            <View style={styles.transportTypes}>
              <Text style={styles.transportTitle}>Transport Types:</Text>
              <View style={styles.transportIcons}>
                {ticketDetails.transportTypes.includes("bus") && (
                  <View style={styles.transportIcon}>
                    <Bus size={20} color="#fff" />
                  </View>
                )}
                {ticketDetails.transportTypes.includes("train") && (
                  <View
                    style={[styles.transportIcon, styles.transportIconTrain]}
                  >
                    <Train size={20} color="#fff" />
                  </View>
                )}
                {ticketDetails.transportTypes.includes("tram") && (
                  <View
                    style={[styles.transportIcon, styles.transportIconTram]}
                  >
                    <Tram size={20} color="#fff" />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Ticket Tiers */}
        <Text style={styles.tierSectionTitle}>Select Ticket Type</Text>

        <View style={styles.tiersContainer}>
          {ticketTiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <TouchableOpacity
                key={tier.id}
                style={[styles.tierCard, isSelected && styles.selectedTierCard]}
                onPress={() => setSelectedTier(tier.id)}
              >
                <View
                  style={[
                    styles.tierColorBand,
                    { backgroundColor: tier.color },
                  ]}
                />

                <View style={styles.tierContent}>
                  <View style={styles.tierHeader}>
                    <View>
                      <Text style={styles.tierName}>{tier.name}</Text>
                      <Text style={styles.tierPrice}>
                        ${tier.price.toFixed(2)}
                      </Text>
                    </View>

                    {isSelected && (
                      <View
                        style={[
                          styles.checkCircle,
                          { backgroundColor: tier.color },
                        ]}
                      >
                        <Check size={16} color="#fff" />
                      </View>
                    )}
                  </View>

                  <View style={styles.tierFeatures}>
                    {tier.features.map((feature, index) => (
                      <View key={index} style={styles.featureRow}>
                        <View
                          style={[
                            styles.featureDot,
                            { backgroundColor: tier.color },
                          ]}
                        />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Buy Button */}
      <View style={styles.buyButtonContainer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <CreditCard size={20} color="#fff" />
          <Text style={styles.buyButtonText}>
            Buy Ticket - $
            {ticketTiers
              .find((tier) => tier.id === selectedTier)
              ?.price.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#1e293b",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  ticketDetailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: "row",
    overflow: "hidden",
  },
  ticketStub: {
    width: 20,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    position: "relative",
  },
  stubCircleTop: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    position: "absolute",
    top: -12,
    left: -12,
  },
  stubCircleBottom: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    position: "absolute",
    bottom: -12,
    left: -12,
  },
  stubLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#e2e8f0",
    borderStyle: "dashed",
  },
  ticketContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#334155",
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
  },
  routeLine: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10b981",
  },
  routePath: {
    flex: 1,
    height: 2,
    backgroundColor: "#10b981",
    marginHorizontal: 4,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748b",
    marginRight: 8,
  },
  detailValue: {
    fontSize: 15,
    color: "#334155",
    marginLeft: 8,
  },
  transportTypes: {
    marginTop: 8,
  },
  transportTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
  },
  transportIcons: {
    flexDirection: "row",
    marginTop: 8,
  },
  transportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transportIconTrain: {
    backgroundColor: "#f97316",
  },
  transportIconTram: {
    backgroundColor: "#6366f1",
  },
  tierSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#334155",
  },
  tiersContainer: {
    marginBottom: 100,
  },
  tierCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: "row",
    overflow: "hidden",
  },
  selectedTierCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  tierColorBand: {
    width: 8,
  },
  tierContent: {
    flex: 1,
    padding: 16,
  },
  tierHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tierName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  tierPrice: {
    fontSize: 20,
    fontWeight: "800",
    color: "#334155",
    marginTop: 4,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tierFeatures: {
    marginTop: 8,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#64748b",
  },
  buyButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  buyButton: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
