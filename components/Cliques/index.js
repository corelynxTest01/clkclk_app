import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import React, { useEffect, useState } from "react";

export default function Cliques() {

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ position: "relative" }}>
        <Text>Hello i am Clique</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
