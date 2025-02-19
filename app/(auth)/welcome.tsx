import {
  Animated,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { Ticket } from "lucide-react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { lightBgColor } from "../../constants/Colors";
import CustomButton from "../../components/custom-button";
import { Checkbox } from "react-native-paper";

const Welcome = () => {
  const iconColor = useThemeColor(
    { light: "#012642", dark: "#f3f4f6" },
    "background"
  );

  return (
    <View style={styles.container}>
      <ThemedView style={styles.content}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15%",
          }}
        >
          <ThemedText style={styles.titlee}>TickEase</ThemedText>
          <Ticket
            color={iconColor}
            style={{ transform: [{ rotate: "-30deg" }] }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Login"
            onPress={() => router.replace("/(auth)/login")}
            style={styles.button}
            textStyle={styles.buttonText}
          />
          <CustomButton
            title="Sign Up"
            onPress={() => router.replace("/(auth)/sign-up")}
            style={styles.button}
            textStyle={styles.buttonText}
          />

          <View style={styles.termsContainer}>
            <View style={styles.checkboxContainer}>
              <ThemedText style={styles.messageText}>
                Don't want to create an account? You can still access the app as
                a guest!
              </ThemedText>
            </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <CustomButton
              title="Continue as a Guest"
              onPress={() => router.replace("/(auth)/login")}
              style={styles.roundButton}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </ThemedView>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "15%",
    marginBottom: "10%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingTop: 20,
  },
  titlee: {
    fontSize: 45,
    fontWeight: "600",
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0084FF",
  },
  buttonContainer: {
    width: "100%",
  },
  roundButton: {
    padding: 18,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: lightBgColor ? "black" : "white",
    borderRadius: 25,
  },
  button: {
    padding: 18,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: lightBgColor ? "black" : "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 30,
  },
  messageText: {
    flex: 1,
    lineHeight: 22,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  link: {
    color: "#0084FF",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
