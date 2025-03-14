import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
  useAnimatedValue,
  StatusBar,
  Dimensions,
  useColorScheme,
  FlatList,
  TextInput,
  Button,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import {
  gray100,
  gray200,
  gray400,
  lightBgColor,
  neutral800,
  neutral900,
  neutral950,
  slate900,
} from "../../constants/Colors";

import {
  CircleX,
  Search,
  SlidersHorizontal,
  SlidersVertical,
} from "lucide-react-native";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

// Mock data - in real app this would come from an API
const events = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "15",
    month: "Aug",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Rock Waves Production",

    category: "Music",
  },
  {
    id: "2",
    title: "Tech Conference 2024",
    date: "20",
    month: "Sept",

    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Viewer Arts Group",

    category: "Technology",
  },
  {
    id: "3",
    title: "Food & Wine Festival",
    date: "5",
    month: "Oct",

    location: "Accra",
    subLocation: "Garage night club",
    organizer: "BET",
    category: "Food",
    image: "https://your-image-url.com/3",
  },
  {
    id: "4",
    title: "Summer Music Festival",
    date: "15",
    month: "Aug",
    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Rock Waves Production",

    category: "Music",
  },
  {
    id: "5",
    title: "Tech Conference 2024",
    date: "20",
    month: "Sept",

    location: "Accra",
    subLocation: "Garage night club",
    organizer: "Viewer Arts Group",

    category: "Technology",
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    date: "5",
    month: "Oct",

    location: "Accra",
    subLocation: "Garage night club",
    organizer: "BET",
    category: "Food",
    image: "https://your-image-url.com/3",
  },
];

const featuredEvents = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "Jun 15-17",
    location: "Central Park",
    price: "$85.00",
    image: "https://picsum.photos/id/1035/300/150",
    category: "event",
  },
  {
    id: "2",
    title: "Basketball Championship",
    date: "Jul 22",
    location: "Sports Arena",
    price: "$65.00",
    image: "https://picsum.photos/id/1058/300/150",
    category: "sport",
  },
  {
    id: "3",
    title: "MTN FA CUP Championship",
    date: "Jul 25",
    location: "Accra Stadium",
    price: "$25.00",
    image: "https://picsum.photos/id/1058/300/150",
    category: "sport",
  },
];

const transportOptions = [
  {
    id: "1",
    title: "Trotro Pass",
    type: "Monthly",
    price: "$120.00",
    image: "https://picsum.photos/id/416/100/100",
  },
  {
    id: "2",
    title: "Bus Ticket",
    type: "Single Journey",
    price: "$2.50",
    image: "https://picsum.photos/id/417/100/100",
  },
  {
    id: "3",
    title: "Train Ticket",
    type: "Round Trip",
    price: "$45.00",
    image: "https://picsum.photos/id/418/100/100",
  },
];

// New data for recommended events based on user preferences
const recommendedEvents = [
  {
    id: "1",
    title: "Jazz Night Downtown",
    date: "May 25",
    location: "Blue Note Club",
    price: "$35.00",
    image: "https://picsum.photos/id/1082/300/150",
  },
  {
    id: "2",
    title: "Modern Art Exhibition",
    date: "Jun 3-10",
    location: "Metropolitan Museum",
    price: "$22.00",
    image: "https://picsum.photos/id/1068/300/150",
  },
];

const categoryColors: Record<string, string> = {
  Music: "#10B981",
  Technology: "#6366f1",
  Food: "#6366f1",
  Sports: "#10B981",
  Art: "#e11d48",
};

const categoryTextColors: Record<string, string> = {
  Music: neutral950,
  Technology: "white",
  Food: "white",
  Sports: neutral950,
  Art: "#e11d48",
};

// Animation for promotions
const scrollX = new Animated.Value(0);
const promotionOpacity = new Animated.Value(1);

const renderCategoryItem = ({ item }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.categoryIconContainer}>
      <Ionicons name={item.icon} size={24} color="#4A80F0" />
    </View>
    <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
  </TouchableOpacity>
);

const renderEventCard = ({ item }) => (
  <TouchableOpacity style={styles.eventCard}>
    <Image source={{ uri: item.image }} style={styles.eventImage} />
    <View style={styles.eventDetails}>
      <ThemedText style={styles.eventTitle}>{item.title}</ThemedText>
      <ThemedText type="desc" style={styles.eventInfo}>
        {item.date} • {item.location}
      </ThemedText>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

// New render function for quick access buttons
const renderQuickAccessItem = ({ item }) => (
  <TouchableOpacity
    style={[styles.quickAccessItem, { backgroundColor: `${item.color}20` }]}
  >
    <View style={[styles.quickAccessIcon, { backgroundColor: item.color }]}>
      <Ionicons name={item.icon} size={20} color="#FFFFFF" />
    </View>
    <Text style={styles.quickAccessText}>{item.title}</Text>
  </TouchableOpacity>
);

// New render function for promotions
const renderPromotionCard = ({ item, index }) => {
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

const EventCard = ({ item }: { item: any }) => {
  const backgroundColor =
    categoryColors[item.category] || categoryColors["Music"];

  const color =
    categoryTextColors[item.category] || categoryTextColors["Music"];

  return (
    <TouchableOpacity
      key={item.id}
      style={[styles.card, { backgroundColor }]}
      onPress={() =>
        router.push({
          pathname: "/(details)/events/[id]",
          params: { id: item.id },
        })
      }
    >
      <View style={styles.cardHeader}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <View style={styles.dateBadge}>
            <Text style={[styles.dateText]}>{item.date}</Text>
            <Text style={styles.monthText}>{item.month}</Text>
          </View>
          <View>
            <Text style={[styles.cardLocation, { color }]}>
              {item.location}
            </Text>
            <Text style={[styles.cardLocation, { color }]}>
              {item.subLocation}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ color, fontWeight: "700" }}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardOrganizer, { color }]}>{item.organizer}</Text>
        <Text style={[styles.cardTitle, { color }]}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const quickAccess = [
  { id: "4", title: "Event Tickets", icon: "calendar", color: "#9C27B0" },
  { id: "1", title: "Transport Pass", icon: "bus", color: "#4CAF50" },
  { id: "2", title: "Movie Tickets", icon: "film", color: "#FF9800" },
  { id: "3", title: "Sport Tickets", icon: "football", color: "#2196F3" },
];

// New data for promotions
const promotions = [
  {
    id: "1",
    title: "Early Bird Special",
    description: "20% off on all concert tickets",
    expiryDate: "Expires in 3 days",
    backgroundColor: "#FFE1E1",
    textColor: "#FF4D4D",
    icon: "pricetag",
  },
  {
    id: "2",
    title: "Weekend Pass",
    description: "Unlimited transport all weekend",
    expiryDate: "Expires this Sunday",
    backgroundColor: "#E1F5FE",
    textColor: "#0288D1",
    icon: "time",
  },
];

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

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

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(events);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(events); // Reset data
      setRefreshing(false);
    }, 1500);
  };

  const handleSearchPress = () => {
    setSearchClicked(!searchClicked);
  };

  const filteredCategories = events.filter((category) => {
    if (category.category === "Music") {
    }
  });

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}

      <View>
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Hello, Junior</ThemedText>
            <ThemedText type="desc" style={styles.subGreeting}>
              What tickets do you need today?
            </ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require("../../assets/images/jake-nackos-IF9TK5Uy-KI-unsplash.jpg")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#A0A0A0"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, transport, tickets..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <CircleX size={20} color="#A0A0A0" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        {/* <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View> */}

        {/* Quick Access Buttons */}
        <View style={styles.quickAccessContainer}>
          <FlatList
            data={quickAccess}
            renderItem={renderQuickAccessItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickAccessList}
          />
        </View>
        {/* Promotions Carousel */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Special Offers</ThemedText>
          <Animated.FlatList
            data={promotions}
            renderItem={renderPromotionCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={width - 40}
            decelerationRate="fast"
            contentContainerStyle={styles.promotionList}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
          />
        </View>

        {/* Featured Events */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Featured Events</ThemedText>
          <FlatList
            data={featuredEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Recommended For You */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <ThemedText style={styles.sectionTitle}>
              Recommended For You
            </ThemedText>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Public Transport */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Public Transport</Text>
          <View style={styles.transportGrid}>
            {transportOptions.map((item) => (
              <TouchableOpacity key={item.id} style={styles.transportCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.transportImage}
                />
                <View style={styles.transportDetails}>
                  <Text style={styles.transportTitle}>{item.title}</Text>
                  <Text style={styles.transportType}>{item.type}</Text>
                  <Text style={styles.transportPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Purchases */}
        <View style={[styles.sectionContainer, { marginBottom: 80 }]}>
          <Text style={styles.sectionTitle}>Recent Purchases</Text>
          <TouchableOpacity style={styles.recentPurchase}>
            <View style={styles.recentPurchaseIcon}>
              <Ionicons name="subway-outline" size={24} color="#FFF" />
            </View>
            <View style={styles.recentPurchaseDetails}>
              <Text style={styles.recentPurchaseTitle}>Weekly Metro Pass</Text>
              <Text style={styles.recentPurchaseDate}>
                Valid until May 21, 2025
              </Text>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Events List */}

      <ThemedView style={styles.eventsList}>
        <FlatList
          data={events}
          renderItem={EventCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <ThemedText
              style={{ fontSize: 15, fontWeight: "500", marginBottom: 10 }}
            >
              Discover Nearby Events
            </ThemedText>
          }
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No items available</Text>
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
          onRefresh={onRefresh}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={6}
          windowSize={10}
          removeClippedSubviews={true}
        />
      </ThemedView>
    </ThemedView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
  },

  greeting: {
    fontSize: 24,
    fontWeight: "600",
  },
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
  subGreeting: {
    fontSize: 16,

    marginTop: 4,
  },
  profileButton: {
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
  quickAccessContainer: {
    marginBottom: 15,
  },
  quickAccessList: {
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#4B5563",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
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
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 15,
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
  promotionList: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flex: 1,
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
  quickAccessItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74, 128, 240, 0.1)",
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  quickAccessIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4A80F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
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
    // backgroundColor: "#10B981",
  },
  cardHeader: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLocation: {
    fontSize: 16,
    fontWeight: "500",
  },
  dateBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: slate900,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  monthText: {
    color: gray400,
    fontSize: 11,
    fontWeight: "500",
  },
  cardContent: {
    marginBottom: 5,
    marginTop: 10,
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

  navButton: {
    padding: 12,
  },

  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  eventCard: {
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginLeft: 20,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  eventDetails: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",

    marginBottom: 5,
  },
  eventInfo: {
    fontSize: 14,

    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A80F0",
  },
  buyButton: {
    backgroundColor: "#4A80F0",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  categoryItem: {
    alignItems: "center",
    marginLeft: 20,
    marginRight: 5,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,

    textAlign: "center",
  },
  transportGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
  },
  transportCard: {
    width: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  transportImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  transportDetails: {
    alignItems: "center",
  },
  transportTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
  },
  transportType: {
    fontSize: 12,
    color: "#6B7280",
    marginVertical: 2,
    textAlign: "center",
  },
  transportPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A80F0",
    marginTop: 2,
  },
  recentPurchase: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  recentPurchaseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A80F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  recentPurchaseDetails: {
    flex: 1,
  },
  recentPurchaseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  recentPurchaseDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  viewButton: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  viewButtonText: {
    color: "#4A80F0",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#A0A0A0",
  },
  activeNavText: {
    color: "#4A80F0",
    fontWeight: "500",
  },
});
