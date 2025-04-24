import { View, Text } from "react-native";
import React from "react";

export default function NoCliqueSelected() {
  return (
    <View
      style={{
        position: "relative",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        No Clique Selected
      </Text>
    </View>
  );
}
