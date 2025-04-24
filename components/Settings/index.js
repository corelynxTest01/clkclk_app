import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import NoCliqueSelected from "../../view/noCliqueSelected";

export default function MySetting() {
  const { selectedClique } = useSelector(({ auth }) => auth) || {};
  if (!selectedClique) return <NoCliqueSelected />;
  return (
    <View>
      <Text>I am Settings Component</Text>
    </View>
  );
}
