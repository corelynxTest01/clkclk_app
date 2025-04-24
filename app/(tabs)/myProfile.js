import { SafeAreaView, View, Text } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";
import Profile from "../../components/Profile";
import AuthHeader from "../../components/AuthHeader";

export default function myProfile() {
  return (
    <SafeAreaView style={Styles.container}>
      <AuthHeader />
      <ScrollViewContainer>
        <Container>
          <Profile />
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
