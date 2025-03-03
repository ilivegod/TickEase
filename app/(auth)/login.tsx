import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../components/custom-button";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "../../hooks/useThemeColor";
import {
  gray100,
  gray200,
  neutral800,
  neutral900,
} from "../../constants/Colors";
import { Link } from "expo-router";

// Form validation schema
const signUpSchema = z.object({
  email: z.string().email("Invalid email address or Username"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const verifySchema = z.object({
  code: z.string().email("Invalid email address"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

// Mock API call
const signUp = async (data: SignUpForm) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export default function SignUpScreen() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const buttonBg = useThemeColor(
    { light: neutral900, dark: gray100 },
    "background"
  );

  const inputBg = useThemeColor(
    { light: gray200, dark: neutral800 },
    "background"
  );

  const buttonTextColor = useThemeColor(
    { light: gray100, dark: neutral900 },
    "background"
  );

  const socialButtonTextColor = useThemeColor(
    { light: neutral900, dark: gray100 },
    "background"
  );

  const socialButtonBorderColor = useThemeColor(
    { light: neutral800, dark: gray200 },
    "background"
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("Sign up successful", data);
      // Handle successful sign up (e.g., navigate to home screen)
    },
  });

  const onSubmit = (data: SignUpForm) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={{ flex: 1, padding: 20 }}>
          <View
            style={[
              styles.header,
              {
                paddingTop: insets.top,
              },
            ]}
          >
            <ThemedText style={styles.title}>
              Log in to your account✨
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Welcome back! Please enter your details
            </ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <ThemedText type="desc" style={styles.label}>
                Email
              </ThemedText>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: inputBg,
                      },
                    ]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email "
                    placeholderTextColor="#A0AEC0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <ThemedText type="desc" style={styles.label}>
                Password
              </ThemedText>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: inputBg,
                      },
                    ]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password"
                    placeholderTextColor="#A0AEC0"
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <Link href={"(auth)/forgot-password"}>
                <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
                  Forgot password
                </ThemedText>
              </Link>
            </View>

            <View
              style={{
                top: "20%",
                gap: 25,
              }}
            >
              <CustomButton
                title={
                  mutation.isPending ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Log in</Text>
                  )
                }
                onPress={handleSubmit(onSubmit)}
                disabled={mutation.isPending}
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

              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    {
                      borderColor: socialButtonBorderColor,
                    },
                  ]}
                >
                  <Image
                    source={require("../../assets/icons/google.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text
                    style={[
                      styles.socialButtonText,
                      {
                        color: socialButtonTextColor,
                      },
                    ]}
                  >
                    Log in with Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              position: "absolute",
              bottom: insets.bottom + 35,
              alignSelf: "center",
            }}
          >
            <ThemedText type="desc" style={{ fontSize: 16 }}>
              Don't have an account?
            </ThemedText>
            <Link href={"(auth)/sign-up"}>
              <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
                Sign up
              </ThemedText>
            </Link>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              position: "absolute",
              bottom: insets.bottom,
              alignSelf: "center",
            }}
          >
            <ThemedText type="desc" style={{ fontSize: 16 }}>
              Or continue as a
            </ThemedText>
            <Link href={"(tabs)"}>
              <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
                Guest
              </ThemedText>
            </Link>
          </View>
        </ThemedView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4A5568",
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F7FAFC",
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  socialButtonText: {
    color: "#4A5568",
    fontSize: 16,
    fontWeight: "500",
  },
});
