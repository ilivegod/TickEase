import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="confirmation" />
      <Stack.Screen name="events" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="singleTicket" />
      <Stack.Screen name="ticketsSelection" />
      <Stack.Screen name="about-app" />
      <Stack.Screen name="report-issue" />
      <Stack.Screen name="privacy-policy" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}
