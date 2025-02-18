import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { Ticket } from "lucide-react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { lightBgColor } from "../../constants/Colors";
import CustomButton from "../../components/custom-button";

const Welcome = () => {
  // Animation for the loading dot

  const handleTermsPress = () => {
    console.log("handleTermsPress");
  };

  const handlePrivacyPress = () => {
    console.log("handleTermsPress");
  };

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
            <View style={styles.checkbox} />
            <ThemedText style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.link} onPress={handleTermsPress}>
                Terms of Use
              </Text>{" "}
              and acknowledge I have read the{" "}
              <Text style={styles.link} onPress={handlePrivacyPress}>
                Privacy Policy
              </Text>
            </ThemedText>
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
    backgroundColor: "#fff",
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#0084FF",
    marginRight: 10,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    lineHeight: 22,
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
});

{
  /* <TouchableOpacity style={styles.button}>
<View
  style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  }}
>
  <Image
    source={google}
    resizeMode="contain"
    style={{ width: 20, height: 20, marginHorizontal: 2 }}
  />
  <Text style={styles.buttonText}>Continue with Google</Text>
</View>
</TouchableOpacity> */
}
