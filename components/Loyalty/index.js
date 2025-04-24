import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import NoCliqueSelected from "../../view/noCliqueSelected";
import { axios } from "../../Utils";
import HtmlPreview from "../../Elements/htmlPreview";
import { useIsFocused } from "@react-navigation/native";
import HocListFunction from "../../container/ListingScroll";
import { useSelector } from "react-redux";
import config from "../../constants/config";
import COLORS from "../../constants/colors";

const apiDataLimit = config.apiDataLimit;

function Loyalty({ refreshing, contentHeight, scrollView }) {
  const isFocused = useIsFocused();
  const { selectedClique } = useSelector(({ auth }) => auth) || {};
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ page: 0, next: false });

  const getLoyaltyRewards = async (status = "active") => {
    if (!selectedClique) return;
    let apiData = [];
    try {
      setLoading(true);
      const response = await axios.get(
        `/members/vouchers?limit=${apiDataLimit}&page=${
          state.page
        }&clique=${selectedClique}&search=${JSON.stringify({ status })}`
      );
      apiData = response.data.data;
      setState((prev) => ({ ...prev, next: response.data.next }));
    } catch (error) {
      console.error("Error fetching Loyalty data:", error);
    } finally {
      setLoading(false);
      return apiData;
    }
  };

  const loadMoreData = async () => {
    if (!state.next) return;
    setState((prev) => ({ ...prev, page: parseInt(prev.page + apiDataLimit) }));
    const loadoreData = await getLoyaltyRewards();
    setLoyalty((prev) => [...prev, ...loadoreData]);
  };

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      const listData = await getLoyaltyRewards();
      setLoyalty(listData);
    })();
    return () => {
      setLoyalty(null);
      setState({ page: 0, next: false });
    };
  }, [isFocused, refreshing]);

  useEffect(() => {
    if (contentHeight !== 0 && scrollView >= contentHeight - 10) loadMoreData();
  }, [scrollView, contentHeight]);

  const loyaltyItem = useCallback(
    ({ item }) => <HtmlPreview htmlContent={item.body} />,
    []
  );

  if (!selectedClique) return <NoCliqueSelected />;

  return (
    <View>
      <FlatList
        data={loyalty}
        style={{ flex: 1 }}
        refreshing={loading}
        scrollEnabled={false}
        renderItem={loyaltyItem}
        keyExtractor={({ _id }, index) => (_id + index).toString()}
      />
      {loading && <ActivityIndicator size="large" color={COLORS.orange} />}
    </View>
  );
}

export default HocListFunction(Loyalty);