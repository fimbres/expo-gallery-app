import { StyleSheet } from "react-native";

import { Colors } from "./colors";

const fontFamilies = {
  figtree: "figtree",
};

export const Styles = StyleSheet.create({
  textTitleGiant: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "800",
    fontSize: 32,
    lineHeight: 43.71,
    color: Colors.black,
  },
  textTitleExtraLarge: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "800",
    fontSize: 24,
    lineHeight: 24,
    color: Colors.black,
  },
  textTitleLarge: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "800",
    fontSize: 20,
    lineHeight: 27.32,
    color: Colors.black,
  },
  textTitleRegular: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 21.86,
    color: Colors.black,
  },
  textTitleSmall: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "800",
    fontSize: 14,
    lineHeight: 19.12,
    color: Colors.black,
  },
  textTitleExtraSmall: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.black,
  },
  textCaptionSmall: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.placeholder,
  },
  textCaptionExtraSmall: {
    fontFamily: fontFamilies.figtree,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.placeholder,
  },
});