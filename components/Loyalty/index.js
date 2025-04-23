import { View, Text, FlatList, loyaltyIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { axios, getToken } from "../../Utils";
import config from "../../constants/config";
import { useIsFocused } from "@react-navigation/native";
import HocListFunction from "../../container/ListingScroll";
import COLORS from "../../constants/colors";
import SpendLoyaltyView from "../../view/spentLoyalty";
import TransView from "../../view/transView";
import ModalContainer from "../../container/ModalContainer";
const apiDataLimit = config.apiDataLimit;

const getView = (item) => {
  const { creditCode } = item;
  switch (creditCode) {
    case config.creditCode["voucher"]:
      return <SpendLoyaltyView {...item} />;
    default:
      return <TransView {...item} />;
  }
};

const getListingView = (item, onListItemPress) => (
  <View
    style={{
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    }}
  >
    <Text style={{ flex: 1 }} onPress={() => onListItemPress(item)}>
      {item.programType}
    </Text>
    <Text style={{ flex: 1 }} onPress={() => onListItemPress(item)}>
      {item.voucherNum}
    </Text>
    <Text
      style={{ flex: 1, textAlign: "center" }}
      onPress={() => onListItemPress(item)}
    >
      $ {item.discount || 0.0}
    </Text>
  </View>
);

function Loyalty({ refreshing, contentHeight, scrollView }) {
  const isFocused = useIsFocused();
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState("Hello world");
  const [state, setState] = useState({ page: 0, next: false });

  const getLoyaltyRewards = async (status = "active") => {
    const cliqueId = await getToken("tempClique");
    if (!cliqueId) return alert("You don't have a clique select  yet.");
    let apiData = [];
    try {
      setLoading(true);
      const response = await axios.get(
        `/members/vouchers?limit=${apiDataLimit}&page=${
          state.page
        }&clique=${cliqueId}&search=${JSON.stringify({ status })}`
      );
      apiData = response.data.data;
      setState((prev) => ({ ...prev, next: response.data.next }));
    } catch (error) {
      console.error("Error fetching Loyalty data:", error);
    } finally {
      setLoading(false);
      console.log("loyalty=>", apiData);
      return apiData;
    }
  };

  const loadMoreData = async () => {
    if (!state.next) return;
    setState((prev) => ({ ...prev, page: parseInt(prev.page + apiDataLimit) }));
    const loadoreData = await getLoyaltyRewards();
    setLoyalty((prev) => [...prev, ...loadoreData]);
  };

  const onListItemPress = (item) => {
    setModalData(getView(item));
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setModalData(null);
  };

  useEffect(() => {
    (async () => {
      if (isFocused) {
        const listData = await getLoyaltyRewards();
        setLoyalty(listData);
      }
    })();
    return () => {
      setLoyalty(null);
      setState({ page: 0, next: false });
    };
  }, [isFocused, refreshing]);

  useEffect(() => {
    if (scrollView >= contentHeight - 10) loadMoreData();
  }, [scrollView, contentHeight]);

  const loyaltyItem = useCallback(
    ({ item }) => getListingView(item, onListItemPress),
    [onListItemPress]
  );

  return (
    <View>
      <ModalContainer visible={modalVisible} onClose={onModalClose}>
        <View
          style={{
            padding: 20,
            backgroundColor: COLORS.white,
            borderRadius: 10,
          }}
        >
          <Text>{modalData}</Text>
        </View>
      </ModalContainer>
      <FlatList
        data={loyalty}
        style={{ flex: 1 }}
        refreshing={loading}
        renderItem={loyaltyItem}
        keyExtractor={({ _id }, index) => (_id + index).toString()}
      />
      {loading && <loyaltyIndicator size="large" color={COLORS.orange} />}
    </View>
  );
}

export default HocListFunction(Loyalty);
