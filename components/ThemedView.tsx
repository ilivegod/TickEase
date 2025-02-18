import { ScrollView, View, type ViewProps } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";
import { darkBgColor, lightBgColor } from "../constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  scrollView?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor = darkBgColor,
  scrollView,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor ?? lightBgColor, dark: darkColor },
    "background"
  );

  return scrollView ? (
    <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  ) : (
    <View style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
