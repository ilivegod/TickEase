import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

const RenderEventCard = ({ item }) => {
  return (
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
};

export default RenderEventCard;

const styles = StyleSheet.create({
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
});
