import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default HtmlPreview = ({ htmlContent }) => {
  const { width, height } = Dimensions.get("window"); // Get device width
  return (
    <WebView
      scrollEnabled={true}
      scalesPageToFit={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      style={{ width: width - 32, height: 150, padding: 0 }} // you can dynamically set height if needed
      automaticallyAdjustContentInsets={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    height: "auto",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
});
