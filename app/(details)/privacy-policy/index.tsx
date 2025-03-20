import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { ThemedView } from "../../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../../components/ThemedText";
import { router } from "expo-router";

const PrivacyPolicyScreen = () => {
  // Current date for the "Last Updated" section
  const lastUpdated = "March 19, 2025";

  // Company information
  const companyInfo = {
    name: "TickEase ",
    address: "Accra, Ghana",
    email: "tickEase@gmail.com",
  };

  const iconColor = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      lightColor="white"
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ThemedView lightColor="white" style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <ThemedText style={styles.screenTitle}>Privacy Policy</ThemedText>
        <View style={styles.placeholder} />
      </ThemedView>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Introduction */}
          <ThemedText type="desc" style={styles.lastUpdated}>
            Last Updated: {lastUpdated}
          </ThemedText>

          <ThemedText lightColor="#333" style={styles.sectionText}>
            Welcome to TickEase! This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our
            mobile ticketing application. Please read this privacy policy
            carefully. If you do not agree with the terms of this privacy
            policy, please do not access the application.
          </ThemedText>

          {/* Collection of Information */}
          <ThemedText lightColor="#000" style={styles.sectionTitle}>
            COLLECTION OF YOUR INFORMATION
          </ThemedText>
          <ThemedText lightColor="#333" style={styles.sectionText}>
            We may collect information about you in various ways. The
            information we may collect via the Application includes:
          </ThemedText>

          <ThemedText lightColor="#000" style={styles.subSectionTitle}>
            Personal Data
          </ThemedText>
          <ThemedText lightColor="#333" style={styles.sectionText}>
            Personally identifiable information, such as your name, email
            address and telephone number that you give to us when you register
            with the Application or when you choose to participate in various
            activities related to the Application.
          </ThemedText>

          <ThemedText lightColor="#000" style={styles.subSectionTitle}>
            Derivative Data
          </ThemedText>
          <ThemedText lightColor="#333" style={styles.sectionText}>
            Information our servers automatically collect when you access the
            Application, such as your native actions that are integral to the
            Application, as well as other interactions with the Application and
            other users via server log files.
          </ThemedText>

          <ThemedText lightColor="#000" style={styles.subSectionTitle}>
            Financial Data
          </ThemedText>
          <ThemedText lightColor="#333" style={styles.sectionText}>
            Financial information, such as data related to your payment method
            (e.g. momo number, valid credit card number, card brand, expiration
            date) that we may collect when you purchase tickets through the
            Application. We store only very limited, if any, financial
            information that we collect. Otherwise, all financial information is
            stored by our payment processor, and you are encouraged to review
            their privacy policy and contact them directly for responses to your
            questions.
          </ThemedText>

          {/* Use of Information */}
          <ThemedText lightColor="#000" style={styles.sectionTitle}>
            USE OF YOUR INFORMATION
          </ThemedText>
          <ThemedText lightColor="#333" style={styles.sectionText}>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Application to:
          </ThemedText>

          <View style={styles.bulletList}>
            <ThemedText lightColor="#333" style={styles.bulletItem}>
              • Create and manage your account.
            </ThemedText>
            <ThemedText lightColor="#333" style={styles.bulletItem}>
              • Process ticket purchases and transactions.
            </ThemedText>
            <ThemedText lightColor="#333" style={styles.bulletItem}>
              • Send you email and SMS regarding your account or purchases and
              ticket access.
            </ThemedText>
            <ThemedText lightColor="#333" style={styles.bulletItem}>
              • Generate event recommendations based on your preferences.
            </ThemedText>
            <ThemedText lightColor="#333" style={styles.bulletItem}>
              • Compile anonymous statistical data for our own use or for a
              third party's use.
            </ThemedText>
            <ThemedText lightColor="#333" style={styles.bulletItem}>
              • Prevent fraudulent transactions, monitor against theft, and
              protect against criminal activity.
            </ThemedText>
          </View>

          {/* Disclosure of Information */}
          <View>
            <ThemedText lightColor="#000" style={styles.sectionTitle}>
              DISCLOSURE OF YOUR INFORMATION
            </ThemedText>
            <ThemedText lightColor="#000" style={styles.bulletItem}>
              • Your information may be disclosed as follows:
            </ThemedText>

            <ThemedText lightColor="#000" style={styles.bulletItem}>
              • By Law or to Protect Rights
            </ThemedText>

            <ThemedText lightColor="#000" style={styles.bulletItem}>
              • Third-Party Service Providers
            </ThemedText>

            <ThemedText lightColor="#000" style={styles.bulletItem}>
              • Marketing Communications
            </ThemedText>
          </View>

          <View style={styles.contactInfo}>
            <ThemedText lightColor="#000" style={styles.contactText}>
              {companyInfo.name}
            </ThemedText>
            <ThemedText lightColor="#000" style={styles.contactText}>
              {companyInfo.address}
            </ThemedText>
            <ThemedText lightColor="#000" style={styles.contactText}>
              {companyInfo.email}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  screenTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  placeholder: {
    width: 60, // To balance the header
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,

    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "600",

    marginTop: 15,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,

    marginBottom: 10,
  },
  bulletList: {
    marginLeft: 10,
    marginBottom: 10,
  },
  bulletItem: {
    fontSize: 15,
    lineHeight: 22,

    marginBottom: 5,
  },
  contactInfo: {
    marginTop: 40,
    marginBottom: 40,
  },
  contactText: {
    fontSize: 15,

    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;
