import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  gray100,
  gray200,
  gray400,
  neutral900,
  neutral950,
  slate900,
} from "../../../constants/Colors";
import { ThemedView } from "../../../components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { Feather, Search, Sliders } from "lucide-react-native";
import { ThemedText } from "../../../components/ThemedText";

import EventCard from "../../../components/eventsCard";
import {
  events,
  featuredEvents,
  promotions,
  quickAccess,
  recommendedEvents,
  transportOptions,
} from "../../(tabs)/mockData/mockData";

const index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(events);

  const insets = useSafeAreaInsets();

  const headerBgColor = useThemeColor(
    { light: gray100, dark: neutral950 },
    "background"
  );

  const searchBgColor = useThemeColor(
    { light: gray200, dark: neutral900 },
    "background"
  );

  const handleSearchPress = () => {
    console.log("hi");
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
      {/* Header */}

      <View
        style={[
          styles.header,
          {
            backgroundColor: headerBgColor,
          },
        ]}
      >
        <View style={{ gap: 7, marginTop: 10, marginBottom: 15 }}>
          <ThemedText style={{ fontSize: 22, letterSpacing: 1.5 }}>
            Find all events here.
          </ThemedText>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: searchBgColor }]}
        >
          <Search size={20} color="#666" />
          <Text style={styles.searchText}>Search events...</Text>
          <Sliders size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Events List */}

      <ThemedView style={styles.eventsList}>
        <FlatList
          data={events}
          renderItem={EventCard}
          keyExtractor={(item) => item.id}
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
};

export default index;

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
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 28,
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
