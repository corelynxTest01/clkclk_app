import { View, Text } from "react-native";
import COLORS from "../constants/colors";
export default function SpendLoyalty({ creditAmount = 0.00, creditDesc }) {
    const creditNo = creditDesc?.split(" ")[1];
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Spent {Math.abs(creditAmount)} loyalty points to earn eReward: <Text style={{ color: COLORS.orange }}>{creditNo}</Text>. You can find this eReward in your activated rewards if you haven't redeem it.</Text>
        </View>
    );
}