import React from "react";
import { SafeAreaView } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";
import Cliques from "../../components/Cliques";
import AuthHeader from "../../components/AuthHeader";

export default function myCliques(props) {
  const [refreshing, setRefreshing] = React.useState(0);
  const headerUpdate = () => {
    setRefreshing(refreshing + 1);
  };
  return (
    <SafeAreaView style={Styles.container}>
      <AuthHeader headerUpdate={headerUpdate} />
      <ScrollViewContainer>
        <Container>
          <Cliques refreshing={refreshing} />
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
