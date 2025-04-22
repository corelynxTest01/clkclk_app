import { View, SafeAreaView, Platform, Text, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { axios, getToken } from "../../Utils";
import { useIsFocused } from "@react-navigation/native";

export default function Activity() {
  const isFocused = useIsFocused();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({ limit: 10, page: 0 });
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
    const authToken = await getToken("authToken");
    if (!cliqueId || !authToken) return;
    try {
      const response = await fetch(
        `https://clkclkdev.corelynx.com/api/members/activity?limit=${state.limit}&page=${state.page}&clique=${cliqueId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );
      const data = await response.json();
      setActivity(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) getActivity();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={({ _id }) => _id.toString()}
        renderItem={ActivityItem}
        refreshing={loading}
        onRefresh={getActivity}
        data={activity}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
