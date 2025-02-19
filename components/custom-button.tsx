import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: any;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  IconLeft,
  IconRight,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
