import { memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default Giftloyalty = memo(({ item, isSeen }) => {
  return (
    <View style={styles.notificationRow}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Gift</Text>
          <Text style={styles.rating}>From: {item?.payload?.name}</Text>
          <Text style={styles.date}>{item.createdDate}</Text>
          <Text style={styles.amount}>{item?.payload?.amount?.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => isSeen(item._id)}>
        <Image source={require("../../assets/images/removeIcon.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  notificationRow: {
    padding: 10,
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
  },
  heading: {
    color: COLORS.blue,
    marginRight: 8,
    fontSize: 16,
  },
  rating: {
    marginRight: 8,
    flexShrink: 1,
  },
  date: {
    marginRight: 8,
  },
  amount: {
    color: COLORS.green,
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});
