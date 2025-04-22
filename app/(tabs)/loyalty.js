import { SafeAreaView, View, Text } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";

export default function loyalty() {
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollViewContainer>
        <Container>
          <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
            My Loyalty
          </Text>
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
