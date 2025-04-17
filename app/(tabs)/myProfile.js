import { SafeAreaView, View, Text } from "react-native";
import Styles from "../../Styles/index.styles";
import Container from "../../container/Container";
import ScrollViewContainer from "../../container/ScrollViewContainer";
import Profile from "../../components/Profile";

export default function myProfile() {
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollViewContainer >
        <Container style={{ marginBottom: 60 }}>
          <Profile />
        </Container>
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
