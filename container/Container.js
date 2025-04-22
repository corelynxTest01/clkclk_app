import { View } from "react-native";
import React from "react";
import COLORS from "../constants/colors";

export default function Container({ children, style = {} }) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.backgroundColor,
        boxShadow: "0px 0px 10px 10px rgba(211, 211, 211, 0.2)",
        ...style,
      }}
    >
      {children}
    </View>
  );
}
