import React from "react";
import { SafeAreaView, View } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import AuthHeader from "../../components/AuthHeader";
import Activity from "../../components/Activity";
import COLORS from "../../constants/colors";

export default function activity() {
  const [refreshing, setRefreshing] = React.useState(0);
  const headerUpdate = () => setRefreshing(refreshing + 1);
  return (
    <SafeAreaView style={Styles.container}>
      <AuthHeader headerUpdate={headerUpdate} />
      <Container
        style={{
          marginTop: 30,
          backgroundColor: COLORS.backgroundColor,
          padding: 25,
          width: "100%",
        }}
      >
        <Activity refreshing={refreshing} />
      </Container>
    </SafeAreaView>
  );
}