import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Share as RNShare,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { slate900 } from "../../../constants/Colors";
import { ThemedText } from "../../../components/ThemedText";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useThemeColor } from "../../../hooks/useThemeColor";

const AboutAppScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();
  // App information
  const appInfo = {
    name: "TickEase",
    version: "1.0.0",
    developer: "Seka Junior",
    website: "https://TickEase.com",
    email: "Tick@Ease.com",
    description:
      "TickEase is your all-in-one mobile solution for discovering, purchasing, and managing tickets to events, concerts, sports, transportation and more.",
    releaseNotes: [
      "Initial public release",
      "Event discovery and ticket purchasing",
      "User account management",
      "Secure payment processing",
      "Mobile ticket access and scanning",
    ],
  };

  // Open URLs helper function
  const openURL = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Cannot open URL: " + url);
      }
    });
  };

  const handleShare = async () => {
    try {
      await RNShare.share({
        message: `Check out ${appInfo.name} - ${appInfo.description} Download now!`,
        url: "https://yourapplink.com",
        title: `Share ${appInfo.name}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const iconColor = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

  // Helper function for section headers
  const SectionHeader = ({ title }) => (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText type="desc" style={styles.sectionHeaderText}>
        {title}
      </ThemedText>
    </ThemedView>
  );

  // Helper function for list items
  const ListItem = ({ text }) => (
    <ThemedView lightColor="white" style={styles.listItem}>
      <Ionicons
        name="checkmark-circle"
        size={18}
        color={iconColor}
        style={styles.listIcon}
      />
      <ThemedText style={styles.listText}>{text}</ThemedText>
    </ThemedView>
  );

  // Helper function for link items
  const LinkItem = ({ icon, title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <ThemedView lightColor="white" style={styles.linkItem}>
        <ThemedView lightColor="white" style={styles.linkItemLeft}>
          <Ionicons name={icon} size={24} color="#007AFF" style={styles.icon} />
          <Text style={styles.linkTitle}>{title}</Text>
        </ThemedView>
        <Ionicons name="open-outline" size={20} color="#C7C7CC" />
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={[styles.container, { paddingTop: inset.top }]}>
      <View style={styles.backHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessible={true}
          accessibilityLabel="Go back"
        >
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* App header with logo and version */}
        <ThemedView lightColor="white" style={styles.header}>
          <ThemedText style={styles.appName}>{appInfo.name}</ThemedText>

          <ThemedText type="desc" style={styles.version}>
            Version {appInfo.version}
          </ThemedText>
        </ThemedView>

        {/* Description */}
        <ThemedView lightColor="white" style={styles.section}>
          <ThemedText style={styles.description}>
            {appInfo.description}
          </ThemedText>
        </ThemedView>

        {/* Contact & Links */}
        <SectionHeader title="CONNECT WITH US" />
        <LinkItem
          icon="globe-outline"
          title={appInfo.website}
          onPress={() => openURL(`https://${appInfo.website}`)}
        />
        <LinkItem
          icon="mail-outline"
          title={appInfo.email}
          onPress={() => openURL(`mailto:${appInfo.email}`)}
        />
        <LinkItem
          icon="star-outline"
          title="Rate us"
          onPress={() =>
            openURL("market://details?id=com.yourcompany.tickethub")
          }
        />
        <LinkItem
          icon="share-social-outline"
          title="Share with your friends"
          onPress={() => {
            handleShare;
          }}
        />

        {/* Release Notes */}
        <SectionHeader title="WHAT'S NEW" />
        <View style={styles.releaseNotes}>
          {appInfo.releaseNotes.map((note, index) => (
            <ListItem key={index} text={note} />
          ))}
        </View>

        {/* Credits */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 {appInfo.developer}</Text>
          <Text style={styles.footerSubtext}>All rights reserved</Text>
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
  header: {
    alignItems: "center",
    paddingVertical: 30,
  },
  backHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 80,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(154, 154, 154, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 16,
    zIndex: 1,
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 15,
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: "600",

    letterSpacing: 0.8,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C7C7CC",
  },
  linkItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  linkTitle: {
    fontSize: 17,
    color: "#007AFF",
  },
  releaseNotes: {
    paddingVertical: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  listIcon: {
    marginRight: 10,
  },
  listText: {
    fontSize: 17,
  },

  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#8E8E93",
    fontSize: 14,
    marginBottom: 4,
  },
  footerSubtext: {
    color: "#8E8E93",
    fontSize: 12,
  },
});

export default AboutAppScreen;
