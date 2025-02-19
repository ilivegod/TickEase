import React from "react";
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
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedText } from "../../components/ThemedText";
import CustomButton from "../../components/custom-button";
import { ThemedView } from "../../components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { lightBgColor } from "../../constants/Colors";

// Form validation schema
const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

// Mock API call
const signUp = async (data: SignUpForm) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
            <ThemedText style={styles.title}>Create an account✨</ThemedText>
            <ThemedText type="desc" style={styles.subtitle}>
              Sign up to get started
            </ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <ThemedText type="desc" style={styles.label}>
                Name
              </ThemedText>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your name"
                    placeholderTextColor="#A0AEC0"
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <ThemedText type="desc" style={styles.label}>
                Email
              </ThemedText>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
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
                    style={styles.input}
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

            <CustomButton
              title={
                mutation.isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign Up</Text>
                )
              }
              onPress={handleSubmit(onSubmit)}
              disabled={mutation.isPending}
              style={styles.button}
              textStyle={styles.buttonText}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>
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
              Already have an account?
            </ThemedText>
            <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
              Sign Up
            </ThemedText>
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
    fontSize: 32,
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
    borderWidth: 1,
    borderColor: lightBgColor ? "#404040" : "red",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: lightBgColor ? "#171717" : "red",
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
    color: "#fff",
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
    color: "#718096",
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
    borderColor: "#E2E8F0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonText: {
    color: "#4A5568",
    fontSize: 16,
    fontWeight: "500",
  },
});
