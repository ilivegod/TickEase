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
import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import { gray100, neutral900, neutral950 } from "../../../constants/Colors";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PriceTier {
  id: string;
  name: string;
  price: number;
  available: number;
  description: string;
}

const priceTiers = [
  {
    id: "1",
    name: " Basic",
    price: 49.99,
    available: 50,
    description: "Limited early bird tickets",
  },
  {
    id: "2",
    name: "Premium",
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

  const bottomBg = useThemeColor(
    { light: neutral950, dark: "white" },
    "background"
  );

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <ThemedText style={styles.title}>Tidal Rave</ThemedText>
              <ThemedText type="desc" style={styles.time}>
                4 PM - 12 AM
              </ThemedText>
            </View>
            <View style={styles.dateBadge}>
              <Text style={styles.dateNumber}>24</Text>
              <Text style={styles.dateMonth}>Sept</Text>
            </View>
          </View>

          <ThemedView
            lightColor="white"
            darkColor="#262626"
            style={styles.locationCard}
          >
            <Ionicons name="location" size={24} color="#6C8EFF" />
            <View style={styles.locationInfo}>
              <ThemedText style={styles.locationTitle}>
                St Stadium, Jouers Preto
              </ThemedText>
              <ThemedText lightColor="#6B7280" style={styles.locationSubtext}>
                Accra, GH
              </ThemedText>
            </View>
          </ThemedView>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>About Event</ThemedText>
            <ThemedText lightColor="#4B5563" style={styles.description}>
              {showFullDescription
                ? description
                : `${description.slice(0, 100)}...`}
              <Text
                style={styles.readMore}
                onPress={() => setShowFullDescription(!showFullDescription)}
              >
                {!showFullDescription ? " Read More" : " Show Less"}
              </Text>
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Ticket Types</ThemedText>
            {priceTiers.map((tier) => (
              <ThemedView
                lightColor="white"
                darkColor="#262626"
                key={tier.id}
                style={styles.ticketCard}
              >
                <View style={styles.ticketHeader}>
                  <ThemedText style={styles.ticketName}>{tier.name}</ThemedText>
                  <Text style={styles.ticketPrice}>${tier.price}</Text>
                </View>
                <ThemedText
                  lightColor="#6B7280"
                  style={styles.ticketDescription}
                >
                  {tier.description}
                </ThemedText>
                <View style={styles.ticketFooter}></View>
              </ThemedView>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Event Details</ThemedText>
            <ThemedView
              lightColor="white"
              darkColor="#262626"
              style={styles.detailsCard}
            >
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={20} color="#6B7280" />
                <ThemedText lightColor="#6B7280" style={styles.detailText}>
                  Doors open at 11:30 AM
                </ThemedText>
              </View>
              <View style={styles.detailItem}>
                <Ionicons
                  name="musical-notes-outline"
                  size={20}
                  color="#6B7280"
                />
                <ThemedText lightColor="#6B7280" style={styles.detailText}>
                  Live performances start at 12 PM
                </ThemedText>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="camera-outline" size={20} color="#6B7280" />
                <ThemedText lightColor="#6B7280" style={styles.detailText}>
                  Photography allowed
                </ThemedText>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="fast-food-outline" size={20} color="#6B7280" />
                <ThemedText lightColor="#6B7280" style={styles.detailText}>
                  Food and beverages available
                </ThemedText>
              </View>
            </ThemedView>
          </View>

          <View style={styles.organizerSection}>
            <View style={styles.organizerAvatar} />
            <View style={styles.organizerInfo}>
              <ThemedText style={styles.organizerTitle}>
                Infinity Events Organizer
              </ThemedText>
              <ThemedText type="desc" style={styles.organizerSubtitle}>
                Event Organizer
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </ScrollView>

      <ThemedView
        lightColor="#F9FAFB"
        darkColor="#171717"
        style={[
          styles.bottomContainer,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.priceContainer}>
          <ThemedText type="desc" style={styles.priceLabel}>
            Starting from
          </ThemedText>
          <ThemedText style={styles.price}>
            ${Math.min(...priceTiers.map((t) => t.price))}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[
            styles.buyButton,
            {
              backgroundColor: bottomBg,
            },
          ]}
          onPress={() =>
            router.push({
              pathname: "(details)/ticketsSelection/[eventId]",
              params: { eventId: id },
            })
          }
        >
          <ThemedText
            lightColor="white"
            darkColor="black"
            style={styles.buyButtonText}
          >
            Buy Tickets
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 280,
    position: "relative",
    backgroundColor: "#f3f4f6",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 40,
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
    backgroundColor: "rgba(154, 154, 154, 0.8)",

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

    marginBottom: 4,
  },
  time: {
    fontSize: 16,
  },
  dateBadge: {
    backgroundColor: "#6C8EFF",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
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

    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  readMore: {
    color: "#6C8EFF",
    fontWeight: "600",
  },
  ticketCard: {
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
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6C8EFF",
  },
  ticketDescription: {
    fontSize: 14,

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
  },
  organizerSubtitle: {
    fontSize: 14,
  },
  bottomContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
  },
  buyButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 100,
    minWidth: 140,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
