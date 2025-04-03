import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function AppLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 50,
          paddingBottom: 5,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e1e8ed",
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "#657786",
        tabBarShowLabel: false,
        header: ({ route, options }) => {
          return (
            <View style={[styles.header, { paddingTop: insets.top }]}>
              <View style={styles.headerContent}>
                {route.name === "index" && (
                  <TouchableOpacity>
                    <Image
                      source={{
                        uri: "https://placeholder.svg?height=32&width=32",
                      }}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                )}
                <View style={styles.titleContainer}>
                  {route.name === "index" && (
                    <Image
                      source={{
                        uri: "https://placeholder.svg?height=30&width=30",
                      }}
                      style={styles.logo}
                    />
                  )}
                  {route.name === "messages" && (
                    <Text style={styles.title}>Messages</Text>
                  )}
                </View>
                <TouchableOpacity style={styles.settingsButton}>
                  <Ionicons name="settings-outline" size={22} color="#1DA1F2" />
                </TouchableOpacity>
              </View>
            </View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 50,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14171A",
  },
  logo: {
    width: 30,
    height: 30,
  },
  settingsButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
