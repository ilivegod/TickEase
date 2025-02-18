import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const Onboarding = () => {
  return (
    <View>
      <Text style={{ color: "white" }}>Welcome</Text>
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      ></TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
