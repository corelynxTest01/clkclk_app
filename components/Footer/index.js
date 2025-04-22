import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
export default function Footer() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        gap: 7,
        padding: 16,
        marginBottom: 50,
        backgroundColor: "#dedcdc",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/faq")}>
        <Text style={{ color: "#989898", fontSize: 20, fontWeight: "bold" }}>
          FAQ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/eula")}>
        <Text style={{ color: "#989898", fontSize: 20, fontWeight: "bold" }}>
          EULA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/contact")}>
        <Text style={{ color: "#989898", fontSize: 20, fontWeight: "bold" }}>
          Contact
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/privacy")}>
        <Text style={{ color: "#989898", fontSize: 20, fontWeight: "bold" }}>
          Privacy Policy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/terms")}>
        <Text style={{ color: "#989898", fontSize: 20, fontWeight: "bold" }}>
          Terms of Service
        </Text>
      </TouchableOpacity>
    </View>
  );
}
