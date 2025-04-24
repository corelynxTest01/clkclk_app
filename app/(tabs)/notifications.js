import { SafeAreaView, View, Text } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";
import Notifications from "../../components/Notification";
import AuthHeader from "../../components/AuthHeader";

export default function notification() {
  return (
    <SafeAreaView style={Styles.container}>
      <AuthHeader />
      <ScrollViewContainer>
        <Container>
          <Notifications />
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
