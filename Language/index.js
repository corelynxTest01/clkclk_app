import React from "react";
import { Text } from "react-native";
import Styles from "../Styles/index.styles";
export default Language = {
    clkclkText: (
        <Text>
            <Text style={{ ...Styles.textGreen, fontWeight: "bold" }}> clk</Text>
            <Text style={{ ...Styles.textOrange, fontWeight: "bold" }}>.</Text>
            <Text style={{ ...Styles.textBlue, fontWeight: "bold" }}>clk</Text>
        </Text>
    ),
    forceLogin: " press Proceed to logout previous session and login to your clkclk account now.",
    cliqueClose: "This will purge all remaining loyalty points, rewards in progress, and any eReward that you may still have. This action cannot be undone.",
    accountClose: "You will lose access to your account, your rewards, rewards in progress, communication history, and more. This action cannot be undone.",
}