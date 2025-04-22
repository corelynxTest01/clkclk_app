import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SelectContainer from "../../Elements/select";
import { getToken, setToken } from "../../Utils";
import { useIsFocused } from "@react-navigation/native";
import config from "../../constants/config";

export default function AuthHeader(props) {
    const isFocused = useIsFocused();
    const [clique, setClique] = useState(null);
    useEffect(() => {
        if (!isFocused) return;
        (async () => {
            const cliqueId = await getToken("tempClique");
            setClique(cliqueId);
        })()
    }, [isFocused]);

    const handleChange = (value) => {
        setToken("tempClique", value);
        setClique(value);
        props?.headerUpdate && props.headerUpdate();
    }

    return (
        <View style={styles.authHeaderContainer}>
            <View style={{ width: "60%", height: 20 }}>
                <SelectContainer
                    name="clique"
                    options={config.democliqueOptions}
                    value={clique}
                    handleChange={handleChange}
                    placeholder="select Clique"
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    authHeaderContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        zIndex: 1000,
        flexDirection: "row",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        fontFamily: "Inter, sans-serif",
        height: 50
    }
});
