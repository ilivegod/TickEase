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
import { gray100, lightBgColor, neutral900 } from "../../constants/Colors";
import CustomButton from "../../components/custom-button";
import { Checkbox } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Welcome = () => {
  const insets = useSafeAreaInsets();

  const iconColor = useThemeColor(
    { light: "#012642", dark: "#f3f4f6" },
    "background"
  );
  const buttonBg = useThemeColor(
    { light: neutral900, dark: gray100 },
    "background"
  );
  const buttonTextColor = useThemeColor(
    { light: gray100, dark: neutral900 },
    "background"
  );

  return (
    <ThemedView
      style={[
        styles.content,
        {
          paddingTop: insets.top,
        },
      ]}
    >
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
          style={[
            styles.button,
            {
              backgroundColor: buttonBg,
            },
          ]}
          textStyle={[
            styles.buttonText,
            {
              color: buttonTextColor,
            },
          ]}
        />
        <CustomButton
          title="Sign Up"
          onPress={() => router.replace("/(auth)/sign-up")}
          style={[
            styles.button,
            {
              backgroundColor: buttonBg,
            },
          ]}
          textStyle={[
            styles.buttonText,
            {
              color: buttonTextColor,
            },
          ]}
        />

        <View style={styles.termsContainer}>
          <View style={styles.checkboxContainer}>
            <ThemedText style={styles.messageText}>
              Don't want to create an account? You can still access the app as a
              guest!
            </ThemedText>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CustomButton
            title="Continue as a Guest"
            onPress={() => router.replace("/(app)")}
            style={[
              styles.roundButton,
              {
                backgroundColor: buttonBg,
              },
            ]}
            textStyle={[
              styles.buttonText,
              {
                color: buttonTextColor,
              },
            ]}
          />
        </View>
      </View>
    </ThemedView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: "7%",
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
    backgroundColor: lightBgColor ? "#f3f4f6" : "black",
    borderRadius: 25,
  },
  button: {
    padding: 18,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
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
