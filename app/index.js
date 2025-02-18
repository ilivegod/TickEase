import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return <Redirect href={"(auth)/welcome"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "pink",
  },
  title2: {
    fontSize: 70,
    fontWeight: "bold",
    color: "pink",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
