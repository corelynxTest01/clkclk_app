import {
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { router, useRouter } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { axios, securityCheck } from "../../Utils";
import COLORS from "../../constants/colors";
import config from "../../constants/config";
import GiftLoyalty from "../../view/Notification/GiftLoyalty";
import Ereply from "../../view/Notification/EReply";
import SelectContainer from "../../Elements/select";

const initialState = {
  notifyType: "",
  page: 0,
  limit: 10,
  next: false,
};

export const Listcontainer = (item, isSeen) => {
  const template = {
    [config.notification.member[1].id]: (
      <GiftLoyalty item={item} isSeen={isSeen} />
    ),
    [config.notification.member[2].id]: <Ereply item={item} isSeen={isSeen} />,
  };
  return template[item?.type?.toString()];
};

const getListingView = (item, isSeen) => (
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
    {Listcontainer(item, isSeen)}
  </View>
);

export default function Notifications() {
  const Router = useRouter();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      await securityCheck(Router);
      setLoading(true);
      let apiData = [];
      try {
        const response = await axios.get(
          `/notification?limit=${state.limit}&page=${state.page}&type=${state.notifyType}`
        );
        apiData = response.data.data;
      } catch (error) {
        console.log(error);
      } finally {
        setNotification(apiData);
        setLoading(false);
      }
    })();
    return () => {
      setNotification(null), setState(initialState);
    };
  }, [isFocused]);

  const notificationItem = useCallback(
    ({ item }) => getListingView(item, isSeen),
    []
  );

  const isSeen = async (id) => {
    try {
      await axios.patch(`/notification?id=${id}`);
      const updatedData =
        (await notification?.filter((item) => item._id !== id)) || [];
      setNotification(updatedData);
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SelectContainer
        name="notifyType"
        options={config.notification.member}
        value={state.notifyType}
        handleChange={(value) =>
          setState((prev) => ({ ...prev, notifyType: value }))
        }
        placeholder="select type"
      />
      {!loading && notification?.length === 0 && (
        <Text>No notification found</Text>
      )}
      <View style={{ position: "relative" }}>
        <FlatList
          data={notification}
          style={{ flex: 1 }}
          refreshing={loading}
          renderItem={notificationItem}
          keyExtractor={({ _id }, index) => (_id + index).toString()}
        />
        {loading && <ActivityIndicator size="large" color={COLORS.orange} />}
      </View>
    </KeyboardAvoidingView>
  );
}
