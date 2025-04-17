import { Text, SafeAreaView } from "react-native";
import Styles from "../../Styles/index.styles";
import Header from "../../components/Header";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";

export default function pricing() {
  return (
    <SafeAreaView style={Styles.container}>
      <Header />
      <ScrollViewContainer style={{ marginTop: 60 }}>
        <Container>
          <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
            Pricing Page
          </Text>
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
