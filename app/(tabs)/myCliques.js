import { SafeAreaView, View, Text } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";
import Cliques from "../../components/Cliques";
import AuthHeader from "../../components/AuthHeader";

export default function myCliques(props) {
  return (
    <SafeAreaView style={Styles.container}>
      <AuthHeader />
      <ScrollViewContainer >
        <Container style={{ marginBottom: 60, marginTop: 30 }}>
          <Cliques />
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}