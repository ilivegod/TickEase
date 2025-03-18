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
        selected && styles.issueTypeButtonSelected,
      ]}
      onPress={() => onPress(type.id)}
    >
      <Ionicons
        name={type.icon}
        size={24}
        color={selected ? "#FFFFFF" : "#007AFF"}
      />
      <Text
        style={[
          styles.issueTypeLabel,
          selected && styles.issueTypeLabelSelected,
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
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
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
            >
              <Ionicons name="chevron-back" size={24} color="#007AFF" />
              <Text style={styles.backButtonText}>Settings</Text>
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Report an Issue</Text>
          </View>

          {/* Instructions */}
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              Please provide details about the issue you're experiencing. This
              will help us fix the problem quickly.
            </Text>
          </View>

          {/* Issue Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              What type of issue are you experiencing?
            </Text>
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
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Describe the issue</Text>
            <TextInput
              style={styles.descriptionInput}
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
            <Text style={styles.sectionTitle}>Your email address</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Additional Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <ToggleOption
              label="Include screenshot of current screen"
              value={includeScreenshot}
              onToggle={setIncludeScreenshot}
            />
            <ToggleOption
              label="Include device & app information"
              value={includeDeviceInfo}
              onToggle={setIncludeDeviceInfo}
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
    backgroundColor: "#FFFFFF",
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
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    marginRight: 40, // To center the title
  },
  instructionContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 20,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333333",
  },
  issueTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  issueTypeButton: {
    width: "48%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  issueTypeButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  issueTypeLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333333",
  },
  issueTypeLabelSelected: {
    color: "#FFFFFF",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    minHeight: 120,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
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
    marginVertical: 20,
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
