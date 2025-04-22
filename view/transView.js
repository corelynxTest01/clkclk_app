import { View, Text } from "react-native";
export default function TransView(transItem) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your purchase amount ${Math.abs(transItem.creditAmount)} on {new Date(transItem.createdDate).toLocaleDateString()}</Text>
    </View>;
}