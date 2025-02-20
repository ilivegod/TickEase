import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// import { Stack } from 'expo-router';
// import { useAuth } from '../src/hooks/useAuth';

// export default function RootLayout() {
//   const { isAuthenticated, isStaff } = useAuth();

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {!isAuthenticated ? (
//         // Auth group
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       ) : isStaff ? (
//         // Staff group
//         <Stack.Screen name="(staff)" options={{ headerShown: false }} />
//       ) : (
//         // Main app group
//         <Stack.Screen name="(app)" options={{ headerShown: false }} />
//       )}
//     </Stack>
//   );
// }
