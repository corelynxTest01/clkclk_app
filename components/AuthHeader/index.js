import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SelectContainer from "../../Elements/select";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Redux/Reducer/authReducer";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import {
  axios,
  getToken,
  setToken,
  clearToken,
  securityCheck,
  JwtDecode,
} from "../../Utils";

export default function AuthHeader(props) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { selectedClique, cliqueOptions } = useSelector(({ auth }) => auth);
  const { setCliqueOptions, setSelectedClique, resetAll } = authActions;

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      try {
        await securityCheck();
        if (!!cliqueOptions) return;
        const response = await axios.get("/members/cliques");
        const cliques = await response.data.data.map((clique) => ({
          ...clique,
          id: clique._id,
        }));
        dispatch(setCliqueOptions(cliques));
      } catch (error) {
        console.error("Error fetching cliques:", error);
      }
    })();
  }, [isFocused]);

  const handleChange = (value) => {
    if (selectedClique === value) return;
    dispatch(setSelectedClique(value));
    props?.headerUpdate && props.headerUpdate();
  };

  const logout = async () => {
    try {
      const token = await getToken("authToken");
      if (!token) return;
      const { id = null } = JwtDecode(token);
      if (!id) return;
      await axios.post(`/logout?id=${id}`);
    } catch (error) {
      console.log("Error logging out:", error);
    } finally {
      dispatch(resetAll());
      await clearToken();
    }
  };

  return (
    <View style={styles.authHeaderContainer}>
      <View style={{ width: "60%", height: 20 }}>
        <SelectContainer
          name="clique"
          options={cliqueOptions}
          value={selectedClique}
          handleChange={handleChange}
          placeholder="select Clique"
        />
      </View>
      <View style={styles.logout}>
        <Ionicons
          size={30}
          name="log-out"
          onPress={logout}
          color={COLORS.orange}
          accessibilityLabel="Logout"
          accessibilityHint="Press to logout from the application"
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
  logout: {
    width: "10%",
    height: 30,
    justifyContent: "right",
    alignItems: "right",
    position: "absolute",
    right: 0,
  },
});
