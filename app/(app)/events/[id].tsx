import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Clock } from "lucide-react-native";
import { useThemeColor } from "../../../hooks/useThemeColor";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const iconColor = useThemeColor(
    { light: "gray", dark: "white" },
    "background"
  );

  const description =
    "Experience an unforgettable day of music, dance, and art at Groove Beats Day Fest! Celebrate local talent and connect with fellow enthusiasts in a vibrant atmosphere. Join us!!";

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
            <TouchableOpacity
              style={styles.iconButton}
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

        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Tidal Rave 🏖️</Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
              >
                <Clock color={iconColor} size={16} />
                <Text style={styles.time}>5 PM - 12 AM</Text>
              </View>
            </View>
            <View style={styles.dateBadge}>
              <Text style={styles.dateNumber}>24</Text>
              <Text style={styles.dateMonth}>Sept</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem1}>
              <Text style={styles.rubricTitle}>Price</Text>
              <Text style={styles.rubricLabel}>Free</Text>
            </View>
            <View style={styles.statItem2}>
              <Text style={styles.rubricTitle}>Category</Text>
              <Text style={styles.rubricLabel}>Music</Text>
            </View>
            <View style={styles.statItem3}>
              <Text style={styles.rubricTitle}> Location</Text>
              <Text style={styles.locationText}>Accra</Text>
              <Text style={styles.locationSubtext}>
                St Stadium, Jouers Preto
              </Text>
            </View>
          </View>

          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>About Tidal Rave</Text>
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(165, 165, 165, 0.6)",
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
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dateNumber: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "600",
  },
  dateMonth: {
    color: "#fff",
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statItem1: {
    width: "20%",
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",

    alignItems: "center",
  },
  statItem2: {
    width: "30%",
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  statItem3: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  rubricTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  rubricLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  memberAvatars: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  avatarCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    borderWidth: 2,
    borderColor: "#fff",
  },
  memberCount: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  locationText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  locationSubtext: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  aboutSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
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
  organizerSection: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  continueButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
