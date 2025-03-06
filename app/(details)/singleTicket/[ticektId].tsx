import { ChevronLeft, Ellipsis } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import {
  gray100,
  gray200,
  neutral800,
  neutral950,
} from "../../../constants/Colors";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { goBack } from "expo-router/build/global-state/routing";

const ETicket = () => {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams();

  const [qrCodeClicked, setQrCodeClicked] = useState(false);

  const notchBg = useThemeColor(
    { light: gray100, dark: neutral950 },
    "background"
  );

  const buttonsBg = useThemeColor(
    { light: gray200, dark: neutral800 },
    "background"
  );

  const iconColor = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

  if (qrCodeClicked)
    return (
      <ThemedView
        style={[
          styles.container,
          {
            marginTop: insets.top,
            marginBottom: insets.bottom,
          },
        ]}
      >
        {/* Status Bar */}
        <StatusBar barStyle="dark-content" />

        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setQrCodeClicked(false)}
            style={[
              styles.iconButton,
              {
                backgroundColor: buttonsBg,
              },
            ]}
          >
            <ChevronLeft width={24} height={24} color={iconColor} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>E-Ticket</ThemedText>
          <TouchableOpacity
            style={[
              styles.iconButton,
              {
                backgroundColor: buttonsBg,
              },
            ]}
          >
            <Ellipsis width={24} height={24} color={iconColor} />
          </TouchableOpacity>
        </View>

        {/* Ticket Card */}
        <View
          style={[
            styles.QRCodeContainer,
            {
              marginTop: 60,
            },
          ]}
        >
          {/* Event Image */}

          {/* Ticket Content */}

          {/* QR Code */}
          <TouchableOpacity
            onPress={() => setQrCodeClicked(true)}
            style={styles.qrCodeContainer}
          >
            <QRCode
              value="GBD99763JS-GROOVE-BEATS-DAY-FEST-24092024"
              size={280}
              backgroundColor="transparent"
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  return (
    <ThemedView
      style={[
        styles.container,
        {
          marginTop: insets.top,
          marginBottom: insets.bottom,
        },
      ]}
    >
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.iconButton,
            {
              backgroundColor: buttonsBg,
            },
          ]}
        >
          <ChevronLeft width={24} height={24} color={iconColor} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>E-Ticket</ThemedText>
        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: buttonsBg,
            },
          ]}
        >
          <Ellipsis width={24} height={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* Ticket Card */}
      <View style={styles.ticketContainer}>
        {/* Event Image */}

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
              <Text style={styles.detailValue}>VIP </Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Order ID</Text>
              <Text style={styles.detailValue}>GBD99763JS</Text>
            </View>
          </View>

          <View style={styles.placeContainer}>
            <Text style={styles.detailLabel}>Place</Text>
            <Text style={styles.detailValuePlace}>
              St Stadium Jouers Preto, San Fransisco Florida, United States
            </Text>
          </View>

          {/* Dashed Line */}
          <View style={styles.dashedLine} />

          {/* QR Code */}
          <TouchableOpacity
            onPress={() => setQrCodeClicked(true)}
            style={styles.qrCodeContainer}
          >
            <QRCode
              value="GBD99763JS-GROOVE-BEATS-DAY-FEST-24092024"
              size={150}
              backgroundColor="transparent"
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* Ticket Notches */}
        <View
          style={[
            styles.leftNotch,
            {
              backgroundColor: notchBg,
            },
          ]}
        />
        <View
          style={[
            styles.rightNotch,
            {
              backgroundColor: notchBg,
            },
          ]}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",
  },
  ticketContainer: {
    backgroundColor: "#9f1239",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    height: "90%",
  },
  QRCodeContainer: {
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  eventImage: {
    width: "100%",
    height: 200,
  },
  ticketContent: {
    padding: 24,
  },
  presenter: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  eventName: {
    fontSize: 32,
    fontWeight: "700",
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
    fontSize: 17,
    color: "white",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  detailValuePlace: {
    fontSize: 20,
    fontWeight: "500",
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
