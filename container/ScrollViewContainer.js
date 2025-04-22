import { ScrollView } from "react-native";

export default function ScrollViewContainer({ children, style }) {
  return (
    <ScrollView
      style={{
        backgroundColor: "#e6e6e6",
        padding: 25,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </ScrollView>
  );
}
