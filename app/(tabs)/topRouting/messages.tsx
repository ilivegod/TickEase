import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample messages data
const messages = [
  {
    id: "1",
    user: "John Doe",
    handle: "@johndoe",
    message: "Hey, how are you doing?",
    time: "2h",
    unread: true,
  },
  {
    id: "2",
    user: "Jane Smith",
    handle: "@janesmith",
    message: "Did you see the new Expo Router update?",
    time: "5h",
    unread: false,
  },
  {
    id: "3",
    user: "Alex Johnson",
    handle: "@alexj",
    message: "Let's catch up soon!",
    time: "1d",
    unread: false,
  },
  {
    id: "4",
    user: "Sarah Williams",
    handle: "@sarahw",
    message: "Thanks for the help with the project!",
    time: "2d",
    unread: false,
  },
];

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#657786"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for people and groups"
          placeholderTextColor="#657786"
        />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <View style={styles.avatar} />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.user}</Text>
                  <Text style={styles.userHandle}>{item.handle}</Text>
                </View>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
              <Text
                style={[
                  styles.messageText,
                  item.unread && styles.unreadMessage,
                ]}
                numberOfLines={1}
              >
                {item.message}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.fabContainer}>
        <View style={styles.fab}>
          <Ionicons name="mail" size={24} color="#fff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5fd",
    borderRadius: 20,
    margin: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#14171A",
  },
  messageItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e1e8ed",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e1e8ed",
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
    marginRight: 5,
  },
  userHandle: {
    color: "#657786",
  },
  messageTime: {
    color: "#657786",
    fontSize: 13,
  },
  messageText: {
    color: "#657786",
  },
  unreadMessage: {
    color: "#14171A",
    fontWeight: "500",
  },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1DA1F2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
