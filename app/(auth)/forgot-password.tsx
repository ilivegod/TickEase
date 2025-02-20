import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedText } from "../../components/ThemedText";
import CustomButton from "../../components/custom-button";
import { ThemedView } from "../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  gray100,
  gray200,
  lightBgColor,
  neutral800,
  neutral900,
} from "../../constants/Colors";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Link } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type forgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const submitForgotPassword = async (data: forgotPasswordForm) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

const ForgotPassword = () => {
  const insets = useSafeAreaInsets();

  const iconColor = useThemeColor(
    { light: "black", dark: "white" },
    "background"
  );

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

  const [code, setCode] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitForgotPassword,
    onSuccess: (data) => {
      console.log("Sign up successful", data);
      // Handle successful sign up (e.g., navigate to home screen)
    },
  });

  const onSubmit = (data: forgotPasswordForm) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <View
          style={[
            styles.header,
            {
              paddingTop: insets.top,
            },
          ]}
        >
          <ThemedText style={styles.title}>Forgot Password?😥</ThemedText>
          <ThemedText type="desc" style={styles.subtitle}>
            No worries, we'll send you reset instructions.
          </ThemedText>
        </View>

        <KeyboardAvoidingView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email</ThemedText>
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
                onChangeText={setCode}
                value={value}
                placeholder="Enter your email"
                placeholderTextColor="#A0AEC0"
                keyboardType="number-pad"
                autoCapitalize="none"
                maxLength={6}
              />
            )}
          />
        </KeyboardAvoidingView>

        <CustomButton
          title={
            mutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Reset password</Text>
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
        <View
          style={{
            alignSelf: "center",
            marginTop: 60,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <ArrowLeft size={20} color={iconColor} />
          <Link href="(auth)/login">
            <ThemedText style={{ fontWeight: "600" }}>
              Back to login{" "}
            </ThemedText>
          </Link>
        </View>
      </ThemedView>
    </View>
  );
};

export default ForgotPassword;

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
    fontSize: 30,
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
    fontWeight: "700",
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    height: 48,
    backgroundColor: "#3182CE",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
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
    flexDirection: "row",
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
