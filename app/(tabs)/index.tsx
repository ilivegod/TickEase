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

// {
//   id,
//   date,
//   month,
//   location,
//   subLocation,
//   organizer,
//   title,
//   attendees,
//   backgroundColor,
// }: {
//   id: any;
//   date: string;
//   month: string;
//   location: string;
//   subLocation: string;
//   organizer: string;
//   title: string;
//   attendees: number;
//   backgroundColor: string;
// }

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
  const [searchClicked, setSearchClicked] = useState(false);

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

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      {searchClicked ? (
        <View
          style={[
            styles.header,
            {
              backgroundColor: headerBgColor,
              marginBottom: 2,
            },
          ]}
        >
          <Animated.View>
            <View style={styles.searchContainer}>
              <Search size={20} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Search events"
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
              {/* <TouchableOpacity>
                <SlidersHorizontal size={20} color="gray" style={styles.icon} />
              </TouchableOpacity> */}
              <Menu>
                <MenuTrigger onPress={() => {}}>
                  <SlidersHorizontal
                    size={20}
                    color="gray"
                    style={styles.icon}
                  />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionsWrapper: {
                      position: "absolute",
                      top: 40,
                      left: 50,
                      backgroundColor: "white",
                      borderRadius: 8,
                      padding: 8,
                      width: 150,
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 5,
                    },
                  }}
                >
                  <Text style={{ paddingLeft: 5, marginBottom: 10 }}>
                    Sort by...
                  </Text>
                  <MenuOption onSelect={() => alert(`Save`)} text="Latest" />
                  <MenuOption onSelect={() => alert(`Save`)} text="Price" />
                  <MenuOption onSelect={() => alert(`Save`)} text="Oldest" />
                </MenuOptions>
              </Menu>
            </View>

            <TouchableOpacity onPress={() => setSearchClicked(!searchClicked)}>
              <ThemedText
                type="desc"
                style={{
                  textDecorationLine: "underline",
                  fontSize: 16,
                  paddingVertical: 10,
                }}
              >
                Back to Discover
              </ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ) : (
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
            <TouchableOpacity
              onPress={handleSearchPress}
              style={styles.searchButton}
            >
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
                    selectedCategory === category &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

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
    borderWidth: 0.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 13,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#4B5563",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flex: 1,
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
