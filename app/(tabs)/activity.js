import { SafeAreaView, View, Text } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";
import AuthHeader from "../../components/AuthHeader";
import Activity from "../../components/Activity";

export default function activity() {
  return (
    <SafeAreaView style={Styles.container}>
      <AuthHeader />
      <ScrollViewContainer >
        <Container style={{ marginBottom: 60, marginTop: 30 }}>
          <Activity />
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  )
}