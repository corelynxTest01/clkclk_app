import { Text, View, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";
import Styles from "../Styles/index.styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollViewContainer from "../container/ScrollViewContainer";
import Container from "../container/Container";

const language = {
  ClkClk_Text: (
    <>
      <Text style={{ ...Styles.textGreen, fontWeight: "bold" }}>clk</Text>
      <Text style={{ ...Styles.textOrange, fontWeight: "bold" }}>.</Text>
      <Text style={{ ...Styles.textBlue, fontWeight: "bold" }}>clk</Text>
    </>
  ),
  Biz_social: (
    <>
      <Text style={Styles.textGreen}>Biz</Text>
      <Text style={Styles.textOrange}>.</Text>
      <Text style={Styles.textBlue}>Social</Text>
    </>
  ),
};

export default function Index() {
  return (
    <SafeAreaView style={Styles.container}>
      <Header />
      <ScrollViewContainer style={{ marginTop: 60 }}>
        <Container>
          <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: "bold" }}>
            Make Connections. Build Rewards.
            <Text style={Styles.textOrange}> It Pays.</Text>
          </Text>
          <Text style={{ color: "#989898", fontSize: 20 }}>
            Connect with your favorite businesses, friends, customers, and
            groups. Get rewarded. It Pays.
          </Text>
          <Text
            style={{
              color: "#555",
              fontSize: 20,
              marginTop: 20,
              marginBottom: 20,
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            "The {language.Biz_social} Network"
          </Text>
          <View
            style={{
              fontSize: 10,
              marginBlock: 10,
              padding: 10,
              textAlign: "center",
              color: "#0a0a0a",
              fontFamily: "Inter, sans-serif",
              backgroundColor: "#dbdbdb",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            <Text style={{ ...Styles.textGreen, fontSize: 17 }}>
              It all begins with one transaction....
            </Text>
            <Text style={{ ...Styles.textBlue, fontSize: 17 }}>
              {" "}
              One eSuite, infinite possibilities.
            </Text>
            <View
              style={{
                flex: 1,
                gap: 22,
                padding: 10,
                marginBlock: 10,
                alignItems: "center",
                backgroundColor: "#dedcdc",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View>
                <Image source={require("../assets/images/eReceipt-icon.png")} />
                <Text
                  style={{
                    ...Styles.textGreen,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  eReceipt
                </Text>
              </View>
              <View>
                <Image source={require("../assets/images/eReview-icon.png")} />
                <Text
                  style={{
                    ...Styles.textBlue,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  eReview
                </Text>
              </View>
              <View>
                <Image source={require("../assets/images/eReply-icon.png")} />
                <Text
                  style={{
                    ...Styles.textBlue,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  eReply
                </Text>
              </View>
              <View>
                <Image source={require("../assets/images/eRefer-icon.png")} />
                <Text
                  style={{
                    ...Styles.textBlue,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  eRefer
                </Text>
              </View>
              <View>
                <Image source={require("../assets/images/eReward-icon.png")} />
                <Text
                  style={{
                    ...Styles.textGreen,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  eReward
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={{
              color: "#555",
              fontSize: 20,
              marginBottom: 20,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            The {language.Biz_social} Network. Synergy Through Networks
          </Text>
          <Text
            style={{
              color: "#989898",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            {language.ClkClk_Text} is a more than just a digital loyalty and
            rewards system. It is a Business and Social Network.
          </Text>
          <Text
            style={{
              color: "#989898",
              fontSize: 20,
              marginBottom: 20,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Directly engage your customers, or your favorite businesses.
            Businesses are able to build their own rewards programs, engagement
            systems, networks, and feedback loops. {language.ClkClk_Text}{" "}
            connects businesses and customers through authentic, symbiotic
            relationships.
          </Text>
          <Text
            style={{
              color: "#989898",
              fontSize: 20,
              marginBottom: 20,
              fontFamily: "Inter, sans-serif",
            }}
          >
            We align businesses and the customers that love them.
          </Text>
          <Text
            style={{
              color: "#989898",
              fontSize: 20,
              marginBottom: 20,
              fontFamily: "Inter, sans-serif",
            }}
          >
            With {language.ClkClk_Text}, businesses are able to build their own
            rewards programs, engagement systems, networks, and feedback loops.
            Businesses and their customers are able to directly engage with one
            another as much or as little as they desire.
          </Text>
          <Text
            style={{
              color: "#555",
              fontSize: 22,
              marginTop: 20,
              marginBottom: 20,
              fontWeight: "bold",
              textAlign: "right",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Building <Text style={Styles.textOrange}>Loyalty</Text> has Never
            Been Easier
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "right",
              color: "#459A00",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Business...
          </Text>
          <Text
            style={{
              fontSize: 25,
              marginBlock: 20,
              textAlign: "right",
              color: "#989898",
              fontFamily: "Inter, sans-serif",
            }}
          >
            It's your business. You know your customers, your industry, and your
            creation, better than anyone. Use {language.ClkClk_Text} to develop
            a custom solution for your operations. Develop unique rewards for
            your valued customers, supporters, and fans. It Pays.
          </Text>
          <Text
            style={{
              fontSize: 24,
              textAlign: "right",
              color: "#00679F",
              fontWeight: "bold",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Customers and Members...
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBlock: 20,
              textAlign: "right",
              color: "#989898",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Connect, Communicate, Collaborate. Engage with your friends, family,
            favorite businesses, and organizations. Get rewarded.{" "}
            <Text style={Styles.textOrange}>It Pays.</Text>
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBlock: 20,
              textAlign: "right",
              color: "#989898",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {language.ClkClk_Text} is the Bridge to More.
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBlock: 20,
              padding: 10,
              textAlign: "center",
              color: "#0a0a0a",
              fontFamily: "Inter, sans-serif",
              backgroundColor: "#dbdbdb",
              fontWeight: "bold",
            }}
          >
            The {language.Biz_social} Network Connect and Get Rewarded
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              color: "#989898",
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
            }}
          >
            {language.ClkClk_Text} integrates to your existing QuickBooks Online
            system.
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              color: "#989898",
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
            }}
          >
            Create an elegant, customer forward experience with{" "}
            {language.ClkClk_Text} - when a customer pays their QuickBooks
            Online Invoice, the eSuite kicks off!
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "#989898",
              marginBottom: 10,
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
            }}
          >
            Create a loyalty system entirely unique to your business.
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              color: "#989898",
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
            }}
          >
            Business more retail focused? No problem! Check out our coming
            Clover integration for those who utilize a physical POS system!
          </Text>
        </Container>
        <Footer />
      </ScrollViewContainer>
    </SafeAreaView>
  );
}
