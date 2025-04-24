import { SafeAreaView, View, Text } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";
import AuthHeader from "../../components/AuthHeader";
import MySetting from "../../components/Settings";

export default function settings() {
  return (
    <SafeAreaView style={Styles.container}>
      <AuthHeader />
      <ScrollViewContainer>
        <Container>
          <MySetting />
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
