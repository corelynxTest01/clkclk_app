import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default HtmlPreview = ({ htmlContent }) => {
  const { width } = Dimensions.get("window"); // Get device width

  const injectedCSS = `
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f5f5f5;
      }
      img, iframe {
        max-width: 100%;
        height: auto;
      }
      * {
        box-sizing: border-box;
      }
    </style>
  `;

  const fullHtml = `
    <html>
      <head>${injectedCSS}</head>
      <body>${htmlContent}</body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: fullHtml }}
        style={{ width: width - 32, height: 400 }} // you can dynamically set height if needed
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
