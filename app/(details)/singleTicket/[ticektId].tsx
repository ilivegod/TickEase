import { ChevronLeft, Ellipsis } from "lucide-react-native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import QRCode from "react-native-qrcode-svg";

const ETicket = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <ChevronLeft width={24} height={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-Ticket</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ellipsis width={24} height={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Ticket Card */}
      <View style={styles.ticketContainer}>
        {/* Event Image */}
        <Image
          source={{
            uri: "https://source.unsplash.com/random/400x200/?concert",
          }}
          style={styles.eventImage}
          resizeMode="cover"
        />

        {/* Ticket Content */}
        <View style={styles.ticketContent}>
          <Text style={styles.presenter}>Local Music Present</Text>
          <Text style={styles.eventName}>Groove Beats Day Fest</Text>

          {/* Two Column Layout */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>24/09/2024</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>12 PM</Text>
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Check In Type</Text>
              <Text style={styles.detailValue}>VIP Experia - D</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Order ID</Text>
              <Text style={styles.detailValue}>GBD99763JS</Text>
            </View>
          </View>

          <View style={styles.placeContainer}>
            <Text style={styles.detailLabel}>Place</Text>
            <Text style={styles.detailValue}>
              St Stadium Jouers Preto, San Fransisco Florida, United States
            </Text>
          </View>

          {/* Dashed Line */}
          <View style={styles.dashedLine} />

          {/* QR Code */}
          <View style={styles.qrCodeContainer}>
            <QRCode
              value="GBD99763JS-GROOVE-BEATS-DAY-FEST-24092024"
              size={150}
              backgroundColor="transparent"
              color="#000"
            />
          </View>
        </View>

        {/* Ticket Notches */}
        <View style={styles.leftNotch} />
        <View style={styles.rightNotch} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  ticketContainer: {
    backgroundColor: "#7B8EF7",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 200,
  },
  ticketContent: {
    padding: 24,
  },
  presenter: {
    fontSize: 18,
    color: "white",
    marginBottom: 4,
  },
  eventName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 24,
  },
  detailsGrid: {
    flexDirection: "row",
    marginBottom: 24,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 18,
    color: "white",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  placeContainer: {
    marginBottom: 24,
  },
  dashedLine: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    marginVertical: 24,
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    alignSelf: "center",
  },
  leftNotch: {
    position: "absolute",
    left: -16,
    top: 550,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
  },
  rightNotch: {
    position: "absolute",
    right: -16,
    top: 550,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
  },
});

export default ETicket;
