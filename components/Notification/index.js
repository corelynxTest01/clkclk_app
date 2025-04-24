import {
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { axios } from "../../Utils";
import COLORS from "../../constants/colors";
import config from "../../constants/config";
import GiftLoyalty from "../../view/Notification/GiftLoyalty";
import Ereply from "../../view/Notification/EReply";
import SelectContainer from "../../Elements/select";

const initialState = {
  notifyType: "",
  page: 0,
  limit: 20,
  next: false,
};

const notificationType = config.notification.member.slice(1, 3);

export const Listcontainer = (item, isSeen) => {
  const template = {
    [notificationType[0].id]: <GiftLoyalty item={item} isSeen={isSeen} />,
    [notificationType[1].id]: <Ereply item={item} isSeen={isSeen} />,
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
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [notification, setNotification] = useState(null);

  const getNotification = async () => {
    const apiData = [];
    try {
      setLoading(true);
      const response = await axios.get(
        `/notification?limit=${state.limit}&page=${state.page}&type=${state.notifyType}`
      );
      apiData.push(...response.data.data);
      setState((prev) => ({ ...prev, next: response.data.next }));
    } catch (error) {
      console.error("Error fetching notification data:", error);
    } finally {
      setLoading(false);
      return apiData;
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      const listData = await getNotification();
      setNotification(listData);
    })();
    return () => {
      setNotification(null), setState(initialState);
    };
  }, [isFocused]);

  const notificationItem = useCallback(
    ({ item }) => getListingView(item, isSeen),
    []
  );

  const handInputleChange = async (value) => {
    await setState((prev) => ({ ...prev, notifyType: value }));
    if (!value) return setNotification(null);
    const listData = await getNotification();
    setNotification(listData);
  };

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
      style={{ flex: 1, alignItems: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SelectContainer
        name="notifyType"
        options={notificationType}
        value={state.notifyType}
        handleChange={handInputleChange}
        placeholder="all notification"
      />

      {!loading && notification?.length === 0 && (
        <Text>No notification found</Text>
      )}

      <View style={{ position: "relative" }}>
        <FlatList
          data={notification}
          style={{ flex: 1 }}
          refreshing={loading}
          scrollEnabled={false}
          renderItem={notificationItem}
          keyExtractor={({ _id }, index) => (_id + index).toString()}
        />
        {loading && <ActivityIndicator size="large" color={COLORS.orange} />}
      </View>
    </KeyboardAvoidingView>
  );
}
