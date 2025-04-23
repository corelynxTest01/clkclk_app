import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import stargry from "../../assets/images/stargry.png";
import starblu from "../../assets/images/starblu.png";
import trashSign from "../../assets/images/removeIcon.png";

export default Ereply = memo(({ item, isSeen }) => {
  return (
    <View style={styles.notificationRow}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>eReply</Text>
        <View style={styles.ratingContainer}>
          <Rating
            rating={parseInt(item.payload.reviewCount) / 5}
            imageSize={20}
            ratingCount={20}
            readonly
            imageEmpty={stargry}
            imageFull={starblu}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item?.payload?.name}
          </Text>
        </TouchableOpacity>
        <Text style={styles.date}>{item.createdDate}</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>view</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => isSeen(item._id)}
      >
        <Image source={trashSign} style={styles.trashIcon} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  notificationRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  heading: {
    color: "green",
    marginRight: 8,
  },
  ratingContainer: {
    marginRight: 8,
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  date: {
    marginRight: 8,
  },
  viewButton: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  viewButtonText: {
    color: "#000",
  },
  closeButton: {
    padding: 8,
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
});
