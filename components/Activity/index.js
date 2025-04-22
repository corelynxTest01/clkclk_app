import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { axios, getToken } from "../../Utils";
import config from "../../constants/config";
import { useIsFocused } from "@react-navigation/native";
import HocListFunction from "../../container/ListingScroll";
import COLORS from "../../constants/colors";
const apiDataLimit = config.apiDataLimit;

function Activity({ refreshing, contentHeight, scrollView }) {
  const isFocused = useIsFocused();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ page: 0, next: false });
  const ActivityItem = useCallback(
    ({ item }) => (
      <View
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {item.transactionId}
        </Text>
        <Text>{item.creditDesc}</Text>
      </View>
    ),
    []
  );

  const getActivity = async () => {
    const cliqueId = await getToken("tempClique");
    if (!cliqueId) return alert("Please select a clique");
    let apiData = [];
    try {
      setLoading(true);
      const response = await axios.get(
        `/members/activity?limit=${apiDataLimit}&page=${state.page}&clique=${cliqueId}`
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

  /* const onRefresh = async () => {
    setState({ page: 0, next: false });
    const listData = await getActivity();
    setActivity(listData);
  };*/

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
    if (scrollView >= contentHeight - 10) loadMoreData();
  }, [scrollView, contentHeight]);

  return (
    <View>
      <FlatList
        data={activity}
        style={{ flex: 1 }}
        refreshing={loading}
        renderItem={ActivityItem}
        keyExtractor={({ _id }, index) => (_id + index).toString()}
        // onRefresh={onRefresh}
      />
      {loading && <ActivityIndicator size="large" color={COLORS.orange} />}
    </View>
  );
}

export default HocListFunction(Activity);
