import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChangePasswordScreen = ({ navigation }) => {
  // State for form fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordColor, setPasswordColor] = useState("#8E8E93");

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      setPasswordColor("#8E8E93");
      return;
    }

    // Check password length
    const lengthValid = password.length >= 8;

    // Check for uppercase, lowercase, number, and special character
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Calculate strength
    const validCount = [
      lengthValid,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
    ].filter(Boolean).length;

    if (validCount <= 2) {
      setPasswordStrength("Weak");
      setPasswordColor("#FF3B30");
    } else if (validCount === 3 || validCount === 4) {
      setPasswordStrength("Medium");
      setPasswordColor("#FF9500");
    } else {
      setPasswordStrength("Strong");
      setPasswordColor("#34C759");
    }
  };

  // Update password and check strength
  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    checkPasswordStrength(text);
  };

  // Validate and update password
  const handleSubmit = () => {
    // Validate inputs
    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }

    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert(
        "Error",
        "New password must be different from current password"
      );
      return;
    }

    // Simulate API call
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Show success message
      Alert.alert(
        "Password Updated",
        "Your password has been successfully changed.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  // Password input field component
  const PasswordInput = ({
    placeholder,
    value,
    onChangeText,
    showPassword,
    setShowPassword,
    isLast = false,
  }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        returnKeyType={isLast ? "done" : "next"}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={22}
          color="#8E8E93"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={styles.backButtonText}>Settings</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Change Password</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Current Password</Text>
            <PasswordInput
              placeholder="Enter your current password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              showPassword={showCurrentPassword}
              setShowPassword={setShowCurrentPassword}
            />

            <Text style={styles.sectionTitle}>New Password</Text>
            <PasswordInput
              placeholder="Enter your new password"
              value={newPassword}
              onChangeText={handleNewPasswordChange}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
            />

            {newPassword ? (
              <View style={styles.strengthContainer}>
                <Text style={styles.strengthLabel}>Password Strength:</Text>
                <Text style={[styles.strengthValue, { color: passwordColor }]}>
                  {passwordStrength}
                </Text>
              </View>
            ) : null}

            <View style={styles.passwordRequirements}>
              <Text style={styles.passwordRequirementsTitle}>
                Password requirements:
              </Text>
              <Text style={styles.requirementText}>
                • At least 8 characters long
              </Text>
              <Text style={styles.requirementText}>
                • Contains uppercase & lowercase letters
              </Text>
              <Text style={styles.requirementText}>
                • Contains at least one number
              </Text>
              <Text style={styles.requirementText}>
                • Contains at least one special character
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Confirm Password</Text>
            <PasswordInput
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              isLast={true}
            />

            {confirmPassword && newPassword !== confirmPassword ? (
              <Text style={styles.errorText}>Passwords do not match</Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!currentPassword ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword) &&
                  styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={
                loading ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Update Password</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordLink}>
              <Text style={styles.forgotPasswordText}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  keyboardAvoidingView: {
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
    fontSize: 17,
    fontWeight: "600",
  },
  placeholder: {
    width: 60, // To balance the header
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginTop: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
    marginBottom: 8,
  },
  strengthLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  strengthValue: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  passwordRequirements: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  passwordRequirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#666666",
  },
  requirementText: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 20,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: -8,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#B8D0F5",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPasswordLink: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
