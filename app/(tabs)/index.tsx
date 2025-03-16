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
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { gray100, gray400, neutral950, slate900 } from "../../constants/Colors";
import { CircleX } from "lucide-react-native";
import EventCard from "./components/eventsCard";
import {
  events,
  featuredEvents,
  promotions,
  quickAccess,
  recommendedEvents,
  transportOptions,
} from "./mockData/mockData";
import RenderPromotionCard from "./components/promotionCard";

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

// card component for featured and recommended events
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

// component function for quick access buttons
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

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(events);

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

  const fadeAnim = useAnimatedValue(0);

  const handlePressBuy = () => {
    console.log("handlePressBuy");
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(events); // Reset data
      setRefreshing(false);
    }, 1500);
  };

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
            renderItem={RenderPromotionCard}
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
          <View style={styles.sectionTitleContainer}>
            <ThemedText style={styles.sectionTitle}>Featured Events</ThemedText>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
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
    marginRight: 20,
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
});
