import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share as RNShare,
  Platform,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface PriceTier {
  id: string;
  name: string;
  price: number;
  å;
  available: number;
  description: string;
}

const priceTiers = [
  {
    id: "1",
    name: "Early Bird",
    price: 49.99,
    available: 50,
    description: "Limited early bird tickets",
  },
  {
    id: "2",
    name: "Regular",
    price: 79.99,
    available: 100,
    description: "Regular admission ticket",
  },
  {
    id: "3",
    name: "VIP",
    price: 149.99,
    available: 20,
    description: "VIP access with exclusive benefits",
  },
];

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const description =
    "Experience an unforgettable day of music, dance, and art at Groove Beats Day Fest! Celebrate local talent and connect with fellow enthusiasts in a vibrant atmosphere. Join us!!";

  const handleShare = async () => {
    try {
      await RNShare.share({
        message: `Check out Groove Beats Day Fest! ${description}`,
        url: `https://yourapp.com/event/${id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFydHl8ZW58MHx8MHx8fDA%3D",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                <Ionicons name="share-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, { marginLeft: 8 }]}
                onPress={() => setIsBookmarked(!isBookmarked)}
              >
                <Ionicons
                  name={isBookmarked ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Groove Beats Day Fest</Text>
              <Text style={styles.time}>12 PM - 2 PM</Text>
            </View>
            <View style={styles.dateBadge}>
              <Text style={styles.dateNumber}>24</Text>
              <Text style={styles.dateMonth}>Sept</Text>
            </View>
          </View>

          <View style={styles.locationCard}>
            <Ionicons name="location" size={24} color="#6C8EFF" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>St Stadium, Jouers Preto</Text>
              <Text style={styles.locationSubtext}>San Francisco, CA</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.description}>
              {showFullDescription
                ? description
                : `${description.slice(0, 100)}...`}
              <Text
                style={styles.readMore}
                onPress={() => setShowFullDescription(!showFullDescription)}
              >
                {!showFullDescription ? " Read More" : " Show Less"}
              </Text>
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ticket Types</Text>
            {priceTiers.map((tier) => (
              <View key={tier.id} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <Text style={styles.ticketName}>{tier.name}</Text>
                  <Text style={styles.ticketPrice}>${tier.price}</Text>
                </View>
                <Text style={styles.ticketDescription}>{tier.description}</Text>
                <View style={styles.ticketFooter}>
                  <Text style={styles.ticketAvailability}>
                    {tier.available} tickets available
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            <View style={styles.detailsCard}>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={20} color="#6B7280" />
                <Text style={styles.detailText}>Doors open at 11:30 AM</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons
                  name="musical-notes-outline"
                  size={20}
                  color="#6B7280"
                />
                <Text style={styles.detailText}>
                  Live performances start at 12 PM
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="camera-outline" size={20} color="#6B7280" />
                <Text style={styles.detailText}>Photography allowed</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="fast-food-outline" size={20} color="#6B7280" />
                <Text style={styles.detailText}>
                  Food and beverages available
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.organizerSection}>
            <View style={styles.organizerAvatar} />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerTitle}>
                Infinity Events Organizer
              </Text>
              <Text style={styles.organizerSubtitle}>Event Organizer</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.price}>
            ${Math.min(...priceTiers.map((t) => t.price))}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() =>
            router.push({
              pathname: "/checkout",
              params: { eventId: id },
            })
          }
        >
          <Text style={styles.buyButtonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 350,
    position: "relative",
    backgroundColor: "#f3f4f6",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerButtons: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",

    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  time: {
    fontSize: 16,
    color: "#6B7280",
  },
  dateBadge: {
    backgroundColor: "#6C8EFF",
    borderRadius: 25,
    padding: 12,
    alignItems: "center",
    minWidth: 56,
  },
  dateNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  dateMonth: {
    color: "#fff",
    fontSize: 14,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  locationInfo: {
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  locationSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4B5563",
  },
  readMore: {
    color: "#6C8EFF",
    fontWeight: "600",
  },
  ticketCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ticketName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6C8EFF",
  },
  ticketDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketAvailability: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "500",
  },
  detailsCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#4B5563",
  },
  organizerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 12,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  organizerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  bottomContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  buyButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 100,
    minWidth: 140,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
