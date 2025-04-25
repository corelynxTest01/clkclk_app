import React from "react";
import { Dimensions } from "react-native";
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
      style={{ width: width - 32, height: 150 }} // you can dynamically set height if needed
      automaticallyAdjustContentInsets={false}
    />
  );
};
