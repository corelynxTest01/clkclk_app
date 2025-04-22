import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SelectContainer from "../../Elements/select";
import { axios, getToken, setToken } from "../../Utils";
import { useIsFocused } from "@react-navigation/native";

export default function AuthHeader(props) {
  const isFocused = useIsFocused();
  const [clique, setClique] = useState(null);
  const [cliqueOptions, setCliqueOptions] = useState([]);
  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        const cliqueId = await getToken("tempClique");
        setClique(cliqueId);
        if (cliqueOptions.length > 0) return;
        const response = await axios.get("/members/cliques");
        const cliques = await response.data.data.map((clique) => ({
          ...clique,
          id: clique._id,
        }));
        setCliqueOptions(cliques);
      } catch (error) {
        console.error("Error fetching cliques:", error);
      }
    })();
  }, [isFocused]);

  const handleChange = (value) => {
    if (clique !== value) {
      setToken("tempClique", value);
      setClique(value);
      props?.headerUpdate && props.headerUpdate();
    }
  };

  return (
    <View style={styles.authHeaderContainer}>
      <View style={{ width: "60%", height: 20 }}>
        <SelectContainer
          name="clique"
          options={cliqueOptions}
          value={clique}
          handleChange={handleChange}
          placeholder="select Clique"
        />
      </View>
    </View>
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
    height: 50,
  },
});
