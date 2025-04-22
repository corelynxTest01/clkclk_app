import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Styles from "../../Styles/index.styles";

const HeaderTextStyle = {
  ...Styles.textGreen,
  ...Styles.FontSize20,
  ...Styles.BoldFont,
};

export default function Header() {
  const router = useRouter();
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        zIndex: 1000,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={HeaderTextStyle}>Login</Text>
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/clkclk.png")}
        style={{ width: "80", height: "auto", resizeMode: "cover" }}
      />
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={HeaderTextStyle}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}
