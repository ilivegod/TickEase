import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample tweet data
const tweets = [
  {
    id: "1",
    user: "John Doe",
    handle: "@johndoe",
    content: "Just setting up my Twitter clone with Expo Router!",
    time: "2m",
  },
  {
    id: "2",
    user: "Jane Smith",
    handle: "@janesmith",
    content:
      "Expo Router makes navigation so much easier. Loving the file-based routing!",
    time: "5m",
  },
  // Add more tweets as needed
];

export default function Home() {
  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tweetContainer}>
            <View style={styles.avatar} />
            <View style={styles.tweetContent}>
              <View style={styles.tweetHeader}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.userHandle}>{item.handle}</Text>
                <Text style={styles.tweetTime}>· {item.time}</Text>
              </View>
              <Text style={styles.tweetText}>{item.content}</Text>
              <View style={styles.tweetActions}>
                <View style={styles.actionButton}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={18}
                    color="#657786"
                  />
                  <Text style={styles.actionText}>3</Text>
                </View>
                <View style={styles.actionButton}>
                  <Ionicons name="repeat-outline" size={18} color="#657786" />
                  <Text style={styles.actionText}>5</Text>
                </View>
                <View style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={18} color="#657786" />
                  <Text style={styles.actionText}>12</Text>
                </View>
                <View style={styles.actionButton}>
                  <Ionicons name="share-outline" size={18} color="#657786" />
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.fabContainer}>
        <View style={styles.fab}>
          <Ionicons name="add" size={24} color="#fff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  tweetContainer: {
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
  tweetContent: {
    flex: 1,
  },
  tweetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userName: {
    fontWeight: "bold",
    marginRight: 5,
  },
  userHandle: {
    color: "#657786",
    marginRight: 5,
  },
  tweetTime: {
    color: "#657786",
  },
  tweetText: {
    lineHeight: 20,
    marginBottom: 10,
  },
  tweetActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
    color: "#657786",
    fontSize: 12,
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
