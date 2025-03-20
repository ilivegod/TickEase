import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { slate900 } from "../../../constants/Colors";
import { router } from "expo-router";

const SettingsScreen = () => {
  const iconColor = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

  const chevronColor = useThemeColor(
    { light: "#C7C7CC", dark: "white" },
    "background"
  );

  const insets = useSafeAreaInsets();

  // State for toggles
  const [pushNotifications, setPushNotifications] = useState(true);

  // function for setting items
  const SettingItem = ({ icon, title, onPress, hasChevron = true }) => (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        lightColor="white"
        darkColor={slate900}
        style={styles.settingItem}
      >
        <View style={styles.settingItemLeft}>
          <Ionicons
            name={icon}
            size={24}
            color={iconColor}
            style={styles.icon}
          />
          <ThemedText style={styles.settingTitle}>{title}</ThemedText>
        </View>
        {hasChevron && (
          <Ionicons name="chevron-forward" size={20} color={chevronColor} />
        )}
      </ThemedView>
    </TouchableOpacity>
  );

  // Helper function for toggle items
  const ToggleItem = ({ icon, title, value, onValueChange }) => (
    <ThemedView
      lightColor="white"
      darkColor={slate900}
      style={styles.settingItem}
    >
      <ThemedView
        lightColor="white"
        darkColor={slate900}
        style={styles.settingItemLeft}
      >
        <Ionicons name={icon} size={24} color={iconColor} style={styles.icon} />
        <ThemedText style={styles.settingTitle}>{title}</ThemedText>
      </ThemedView>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#C7C7CC", true: "#4CD964" }}
        ios_backgroundColor="#C7C7CC"
      />
    </ThemedView>
  );

  // Helper function for section headers
  const SectionHeader = ({ title }) => (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText style={styles.sectionHeaderText}>{title}</ThemedText>
    </ThemedView>
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("User logged out"),
      },
    ]);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView}>
        <SectionHeader title="ACCOUNT" />
        <SettingItem
          icon="person-outline"
          title="Profile Information"
          onPress={() => console.log("Profile pressed")}
        />
        <SettingItem
          icon="key-outline"
          title="Change Password"
          onPress={() => router.push("(details)/change-password")}
        />

        <SectionHeader title="NOTIFICATIONS" />
        <ToggleItem
          icon="notifications-outline"
          title="Push Notifications"
          value={pushNotifications}
          onValueChange={setPushNotifications}
        />

        {/* <SectionHeader title="PAYMENT" />
        <SettingItem
          icon="card-outline"
          title="Payment Methods"
          onPress={() => console.log("Payment methods pressed")}
        /> */}

        <SectionHeader title="PRIVACY & SECURITY" />
        <SettingItem
          icon="shield-checkmark-outline"
          title="Privacy Policy"
          onPress={() => router.push("(details)/privacy-policy")}
        />

        <SectionHeader title="SUPPORT" />

        <SettingItem
          icon="bug-outline"
          title="Report an Issue"
          onPress={() => router.push("(details)/report-issue")}
        />

        <SectionHeader title="ABOUT" />
        <SettingItem
          icon="information-circle-outline"
          title="About this App"
          onPress={() => router.push("(details)/about-app")}
        />

        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Tickease</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: 0.8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#8E8E93",
    fontSize: 12,
  },
  logoutContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  button: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SettingsScreen;
