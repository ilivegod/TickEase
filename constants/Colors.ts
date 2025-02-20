/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import Color from "color";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    desc: '#374151'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    desc: '#e5e7eb'

  },
};

export const slate900 = "#0f172a";
export const gray100 = "#f3f4f6"
export const gray200 = "#e5e7eb"
export const neutral900 = "#171717"
export const neutral950 = "#0a0a0a"
export const neutral800 = "#262626"




   

export const lightBgColor = Color("#f5f5f5").string();
export const darkBgColor = Color("#0a0a0a").string();

export const lightCardColor = Color("#fff").string();
export const darkCardColor = Color("#012642").string();

