import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";
import Feather from "react-native-vector-icons/Feather"; // Import the entire Feather icon set

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
  showBorder?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  onPress,
  hasToggle = false,
  toggleValue = false,
  onToggleChange = () => {},
  showBorder = true,
}) => (
  <TouchableOpacity
    style={[styles.settingItem, showBorder && styles.borderBottom]}
    onPress={onPress}
    disabled={hasToggle}
  >
    <View style={styles.settingItemLeft}>
      {icon}
      <Text style={styles.settingTitle}>{title}</Text>
    </View>
    {hasToggle ? (
      <Switch
        value={toggleValue}
        onValueChange={onToggleChange}
        trackColor={{ false: "#767577", true: "#4630EB" }}
        thumbColor={
          Platform.OS === "ios"
            ? "#FFFFFF"
            : toggleValue
            ? "#FFFFFF"
            : "#f4f3f4"
        }
        ios_backgroundColor="#3e3e3e"
      />
    ) : (
      <Feather name="chevron-right" size={20} color="#A0A0A0" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingTitle: {
    fontSize: 16,
    marginLeft: 16,
    color: "#000000",
  },
});

export default SettingItem;
