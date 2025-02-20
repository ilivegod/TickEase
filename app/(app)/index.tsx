import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  useColorScheme,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import {
  gray100,
  gray200,
  lightBgColor,
  neutral800,
  neutral900,
  neutral950,
} from "../../constants/Colors";

// Mock data - in real app this would come from an API
const events = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "Aug 15, 2024",
    location: "Central Park, NY",
    price: "$49.99",
    category: "Music",
    image: "https://your-image-url.com/1",
  },
  {
    id: "2",
    title: "Tech Conference 2024",
    date: "Sep 20, 2024",
    location: "Convention Center",
    price: "$199",
    category: "Technology",
    image: "https://your-image-url.com/2",
  },
  {
    id: "3",
    title: "Food & Wine Festival",
    date: "Oct 5, 2024",
    location: "Downtown Square",
    price: "$75",
    category: "Food",
    image: "https://your-image-url.com/3",
  },
];

const EventCard = ({
  date,
  location,
  subLocation,
  organizer,
  title,
  attendees,
  backgroundColor,
}: {
  date: string;
  location: string;
  subLocation: string;
  organizer: string;
  title: string;
  attendees: number;
  backgroundColor: string;
}) => (
  <View style={[styles.card, { backgroundColor }]}>
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.cardLocation}>{location}</Text>
        <Text style={styles.cardLocation}>{subLocation}</Text>
      </View>
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardOrganizer}>{organizer}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <View style={styles.cardFooter}>
      <View style={styles.avatarGroup}>
        <View
          style={[
            styles.avatar,
            { marginRight: -10, borderColor: backgroundColor },
          ]}
        >
          <Image
            source={{ uri: "https://v0.dev/placeholder.svg" }}
            style={styles.avatarImage}
          />
        </View>
        <View style={[styles.avatar, { borderColor: backgroundColor }]}>
          <Image
            source={{ uri: "https://v0.dev/placeholder.svg" }}
            style={styles.avatarImage}
          />
        </View>
      </View>
      <Text style={styles.attendeeCount}>+{attendees}</Text>
    </View>
  </View>
);

const categories = [
  "All Events",
  "Music",
  "Sports",
  "Technology",
  "Food",
  "Arts",
];

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  const headerBgColor = useThemeColor(
    { light: gray100, dark: neutral950 },
    "background"
  );

  const pillsSelectedBgColor = useThemeColor(
    { light: neutral950, dark: "white" },
    "background"
  );

  const pillsNotSelectedBgColor = useThemeColor(
    { light: neutral950, dark: "white" },
    "background"
  );

  const renderEventCard = (event: any) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventCard}
      onPress={() =>
        router.push({
          pathname: "/(app)/events/[id]",
          params: { id: event.id },
        })
      }
    >
      {/* <Image
        source={{ uri: event.image }}
        style={styles.eventImage}
        defaultSource={require("../assets/placeholder.png")}
      /> */}
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.categoryText}>{event.category}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.priceText}>{event.price}</Text>
        </View>

        <Text style={styles.eventTitle}>{event.title}</Text>

        <View style={styles.eventFooter}>
          <View style={styles.footerItem}>
            <Feather name="calendar" size={16} color="#666" />
            <Text style={styles.footerText}>{event.date}</Text>
          </View>
          <View style={styles.footerItem}>
            <Feather name="map-pin" size={16} color="#666" />
            <Text style={styles.footerText}>{event.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: headerBgColor,
          },
        ]}
      >
        <View style={styles.topSide}>
          <Image
            source={require("../../assets/images/jake-nackos-IF9TK5Uy-KI-unsplash.jpg")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 7, marginTop: 10, marginBottom: 15 }}>
          <ThemedText type="desc">Hi, Junior</ThemedText>
          <ThemedText style={{ fontSize: 29, letterSpacing: 1.5 }}>
            Find your next event.
          </ThemedText>
        </View>

        {/* Search Bar */}
        {/* <TouchableOpacity style={styles.searchBar}>
          <Feather name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Search events...</Text>
          <Feather name="sliders" size={20} color="#666" />
        </TouchableOpacity> */}

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && {
                  backgroundColor: pillsSelectedBgColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <View
        style={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: "white",
          paddingTop: 16,
          paddingLeft: 16,
        }}
      >
        <ThemedText style={{ fontSize: 15, fontWeight: "500" }}>
          Discover Nearby Events
        </ThemedText>
      </View>
      <ScrollView
        contentContainerStyle={styles.eventsList}
        showsVerticalScrollIndicator={false}
      >
        <EventCard
          date="25"
          location="Golden Gate"
          subLocation="Arts and Culture"
          organizer="Viewer Arts Group"
          title="Spring Art Exhibition"
          attendees={4}
          backgroundColor="#10B981"
        />
        <EventCard
          date="24"
          location="San Francisco"
          subLocation="Golden Gate Pavilion"
          organizer="Rock Waves Production"
          title="Summer Music Festival"
          attendees={8}
          backgroundColor="#4F46E5"
        />
        {events.map(renderEventCard)}
      </ScrollView>
    </ThemedView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  topSide: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1A1A1A",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 25,
    marginBottom: 16,
  },
  searchText: {
    flex: 1,
    marginLeft: 8,
    color: "#666666",
    fontSize: 16,
  },

  selectedCategoryButton: {
    backgroundColor: "black",
  },
  categoryButtonText: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  eventsList: {
    gap: 16,
    padding: 16,
    backgroundColor: "white",
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#F5F5F5",
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "500",
  },
  dotSeparator: {
    color: "#666666",
    marginHorizontal: 8,
  },
  priceText: {
    color: "#666666",
    fontSize: 14,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  eventFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    color: "#666666",
    fontSize: 14,
    marginLeft: 4,
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6B7280",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "white",
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },

  activeCategoryText: {
    color: "#FFFFFF",
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllText: {
    color: "#4F46E5",
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardLocation: {
    color: "#FFFFFF",
    opacity: 0.9,
    fontSize: 14,
  },
  dateBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  cardContent: {
    marginBottom: 16,
  },
  cardOrganizer: {
    color: "#FFFFFF",
    opacity: 0.75,
    fontSize: 14,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarGroup: {
    flexDirection: "row",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  attendeeCount: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  navButton: {
    padding: 12,
  },
});
