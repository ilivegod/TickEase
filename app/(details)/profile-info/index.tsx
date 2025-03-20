import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Camera } from "lucide-react-native";
import { ThemedView } from "../../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeColor } from "../../../hooks/useThemeColor";
import { ThemedText } from "../../../components/ThemedText";
import {
  gray200,
  gray400,
  neutral700,
  neutral800,
  neutral900,
} from "../../../constants/Colors";

const ProfileInformationScreen = () => {
  const [profileData, setProfileData] = useState({
    name: "Seka Junior",
    email: "sekajunior2014@gmail.com",
    phone: "+233 (0)20 833 8655 ",
  });

  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData({ ...formData });
    setIsEditing(false);
  };

  const iconColor = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

  const formBg = useThemeColor(
    { light: gray200, dark: neutral700 },
    "background"
  );

  const formColor = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={iconColor} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Profile Information</ThemedText>
        </View>

        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "/api/placeholder/120/120" }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {!isEditing ? (
          <ThemedView
            lightColor="white"
            darkColor={neutral800}
            style={styles.infoContainer}
          >
            <InfoItem label="Name" value={profileData.name} />
            <InfoItem label="Email" value={profileData.email} />
            <InfoItem label="Phone" value={profileData.phone} />

            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <ThemedView
            lightColor="white"
            darkColor={neutral800}
            style={styles.formContainer}
          >
            <View style={styles.inputGroup}>
              <ThemedText type="desc" style={styles.label}>
                Name
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: formBg, color: formColor },
                ]}
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText type="desc" style={styles.label}>
                Email
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: formBg, color: formColor },
                ]}
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText type="desc" style={styles.label}>
                Phone
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: formBg, color: formColor },
                ]}
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
};

// Helper component for displaying info items
const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <ThemedText
      lightColor="#6c757d"
      darkColor="#6c757d"
      style={styles.infoLabel}
    >
      {label}
    </ThemedText>
    <ThemedText darkColor="white" style={styles.infoValue}>
      {value}
    </ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e1e4e8",
  },
  cameraButton: {
    position: "absolute",
    right: 135,
    bottom: 0,
    backgroundColor: "#4a80f5",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  infoContainer: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    paddingBottom: 12,
  },
  infoLabel: {
    fontSize: 15,

    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
  },
  editButton: {
    backgroundColor: "#4a80f5",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  formContainer: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,

    marginBottom: 8,
  },
  input: {
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 3,
  },
  toggleOn: {
    backgroundColor: "#4a80f5",
    justifyContent: "flex-end",
  },
  toggleOff: {
    backgroundColor: "#ced4da",
    justifyContent: "flex-start",
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#ffffff",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  cancelButtonText: {
    color: "#6c757d",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#4a80f5",
    marginLeft: 8,
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileInformationScreen;
