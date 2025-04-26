import { View, Text, FlatList, ActivityIndicator} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { axios } from "../../Utils";
import NoCliqueSelected from "../../view/noCliqueSelected";
import config from "../../constants/config";
import { useIsFocused } from "@react-navigation/native";
import HocListFunction from "../../container/ListingScroll";
import COLORS from "../../constants/colors";
import { useSelector } from "react-redux";
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
      {new Date(item.createdDate).toLocaleDateString()}
    </Text>
    <Text style={{ flex: 1 }} onPress={() => onListItemPress(item)}>
      {item.creditDesc}
    </Text>
    <Text
      style={{ flex: 1, textAlign: "center" }}
      onPress={() => onListItemPress(item)}
    >
      $ {item.creditAmount || 0.0}
    </Text>
  </View>
);

function Activity({ refreshing, contentHeight, scrollView }) {
  const isFocused = useIsFocused();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedClique } = useSelector(({ auth }) => auth) || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [state, setState] = useState({ page: 0, next: false });

  const getActivity = async () => {
    if (!selectedClique) return;
    let apiData = [];
    try {
      setLoading(true);
      const response = await axios.get(
        `/members/activity?limit=${apiDataLimit}&page=${state.page}&clique=${selectedClique}`
      );
      apiData = response.data.data;
      setState((prev) => ({ ...prev, next: response.data.next }));
    } catch (error) {
      console.error("Error fetching activity data:", error);
    } finally {
      setLoading(false);
      return apiData;
    }
  };

  const loadMoreData = async () => {
    if (!state.next) return;
    setState((prev) => ({ ...prev, page: parseInt(prev.page + apiDataLimit) }));
    const loadoreData = await getActivity();
    setActivity((prev) => [...prev, ...loadoreData]);
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
        const listData = await getActivity();
        setActivity(listData);
      }
    })();
    return () => {
      setActivity(null);
      setState({ page: 0, next: false });
    };
  }, [isFocused, refreshing]);

  useEffect(() => {
    if (contentHeight !== 0 && scrollView >= contentHeight - 10) loadMoreData();
  }, [scrollView, contentHeight]);

  const ActivityItem = useCallback(
    ({ item }) => getListingView(item, onListItemPress),
    [onListItemPress]
  );

  if (!selectedClique) return <NoCliqueSelected />;

  return (
    <View>
      {loading && <ActivityIndicator size="large" color={COLORS.orange} />}
      <FlatList
        data={activity}
        style={{ flex: 1 }}
        refreshing={loading}
        scrollEnabled={false}
        renderItem={ActivityItem}
        keyExtractor={({ _id }, index) => (_id + index).toString()}
      />
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
    </View>
  );
}

export default HocListFunction(Activity);