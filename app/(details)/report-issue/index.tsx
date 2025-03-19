import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedView } from "../../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../../components/ThemedText";
import {
  gray100,
  gray400,
  neutral800,
  neutral900,
} from "../../../constants/Colors";
import { useThemeColor } from "../../../hooks/useThemeColor";

const ReportIssueScreen = ({ navigation }) => {
  // State for form fields
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [includeScreenshot, setIncludeScreenshot] = useState(true);
  const [includeDeviceInfo, setIncludeDeviceInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  // Issue type options
  const issueTypes = [
    { id: "bug", label: "App Bug/Crash", icon: "bug-outline" },
    { id: "purchase", label: "Purchase Problem", icon: "card-outline" },
    { id: "account", label: "Account Issue", icon: "person-outline" },
    { id: "tickets", label: "Ticket Access", icon: "ticket-outline" },
    { id: "suggestion", label: "Feature Request", icon: "bulb-outline" },
    { id: "other", label: "Other", icon: "ellipsis-horizontal-outline" },
  ];

  const insets = useSafeAreaInsets();

  const buttonColorBg = useThemeColor(
    { light: neutral800, dark: gray100 },
    "background"
  );

  const buttonBg = useThemeColor(
    { light: gray100, dark: neutral900 },
    "background"
  );

  const iconColorLight = useThemeColor(
    { light: neutral800, dark: "white" },
    "background"
  );

  const buttonTextColor = useThemeColor(
    { light: "#333333", dark: gray100 },
    "background"
  );

  const buttonSelectedTextColor = useThemeColor(
    { light: gray100, dark: "#333333" },
    "background"
  );

  const iconColorDark = useThemeColor(
    { light: "white", dark: neutral800 },
    "background"
  );

  const textInputBorderColor = useThemeColor(
    { light: "gray", dark: gray400 },
    "background"
  );

  // Function to simulate report submission
  const submitReport = () => {
    // Validate inputs
    if (!issueType) {
      Alert.alert("Error", "Please select an issue type");
      return;
    }

    if (!description || description.trim().length < 10) {
      Alert.alert(
        "Error",
        "Please provide a detailed description (minimum 10 characters)"
      );
      return;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Please provide a valid email address");
      return;
    }

    // Simulate API call
    setLoading(true);

    // Mock the API response time
    setTimeout(() => {
      setLoading(false);

      // Show success message
      Alert.alert(
        "Report Submitted",
        "Thank you for your feedback! We will review your report and contact you if needed.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1500);
  };

  // Helper component for selectable issue type buttons
  const IssueTypeButton = ({ type, onPress, selected }) => (
    <TouchableOpacity
      style={[
        styles.issueTypeButton,
        { backgroundColor: buttonBg },
        selected && {
          backgroundColor: buttonColorBg,
          borderColor: buttonColorBg,
        },
      ]}
      onPress={() => onPress(type.id)}
    >
      <Ionicons
        name={type.icon}
        size={24}
        color={selected ? iconColorDark : iconColorLight}
      />
      <Text
        style={[
          styles.issueTypeLabel,
          { color: buttonTextColor },
          selected && { color: buttonSelectedTextColor },
        ]}
      >
        {type.label}
      </Text>
    </TouchableOpacity>
  );

  // Helper component for toggle options
  const ToggleOption = ({ label, value, onToggle }) => (
    <TouchableOpacity
      style={styles.toggleOption}
      onPress={() => onToggle(!value)}
    >
      <Text style={styles.toggleLabel}>{label}</Text>
      <View
        style={[
          styles.toggleButton,
          value ? styles.toggleButtonActive : styles.toggleButtonInactive,
        ]}
      >
        <View
          style={[
            styles.toggleIndicator,
            value
              ? styles.toggleIndicatorActive
              : styles.toggleIndicatorInactive,
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView
      darkColor={neutral900}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              accessible={true}
              accessibilityLabel="Go back"
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <ThemedText style={styles.screenTitle}>Report an Issue</ThemedText>
          </View>

          {/* Instructions */}
          <ThemedView lightColor="white" style={styles.instructionContainer}>
            <ThemedText type="desc" style={styles.instructionText}>
              Please provide details about the issue you're experiencing. This
              will help us fix the problem quickly.
            </ThemedText>
          </ThemedView>

          {/* Issue Type Selection */}
          <ThemedView lightColor="white" style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              What type of issue are you experiencing?
            </ThemedText>
            <View style={styles.issueTypeContainer}>
              {issueTypes.map((type) => (
                <IssueTypeButton
                  key={type.id}
                  type={type}
                  selected={issueType === type.id}
                  onPress={setIssueType}
                />
              ))}
            </View>
          </ThemedView>

          {/* Description */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Describe the issue
            </ThemedText>
            <TextInput
              style={[
                styles.descriptionInput,
                { borderColor: textInputBorderColor },
              ]}
              placeholder="Please provide as much detail as possible..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Contact Email */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Your email address
            </ThemedText>
            <TextInput
              style={[styles.emailInput, { borderColor: textInputBorderColor }]}
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitReport}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Report</Text>
            )}
          </TouchableOpacity>

          {/* Privacy Note */}
          <Text style={styles.privacyNote}>
            Your report may include personal information as described in our
            <Text style={styles.linkText}> Privacy Policy</Text>.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(154, 154, 154, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  screenTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginRight: 40, // To center the title
  },
  instructionContainer: {
    padding: 16,

    marginBottom: 12,
  },
  instructionText: {
    fontSize: 15,
    lineHeight: 20,
  },
  section: {
    marginBottom: 0,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  issueTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  issueTypeButton: {
    width: "48%",
    padding: 14,
    borderRadius: 8,

    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  // issueTypeButtonSelected: {
  //   backgroundColor: iconColor,
  //   borderColor: neutral800,
  // },
  issueTypeLabel: {
    marginLeft: 8,
    fontSize: 14,
  },

  descriptionInput: {
    borderWidth: 1,

    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
  },
  emailInput: {
    borderWidth: 1,

    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  toggleOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  toggleLabel: {
    fontSize: 16,
    color: "#333333",
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
  },
  toggleButtonActive: {
    backgroundColor: "#34C759",
  },
  toggleButtonInactive: {
    backgroundColor: "#E9E9EA",
  },
  toggleIndicator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "white",
  },
  toggleIndicatorActive: {
    transform: [{ translateX: 20 }],
  },
  toggleIndicatorInactive: {
    transform: [{ translateX: 0 }],
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  privacyNote: {
    textAlign: "center",
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 30,
    marginHorizontal: 16,
  },
  linkText: {
    color: "#007AFF",
  },
});

export default ReportIssueScreen;
