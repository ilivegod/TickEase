import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { gray400, neutral950, slate900 } from "../constants/Colors";

const EventCard = ({ item }: { item: any }) => {
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

export default EventCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
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
  cardLocation: {
    fontSize: 16,
    fontWeight: "500",
  },
});
