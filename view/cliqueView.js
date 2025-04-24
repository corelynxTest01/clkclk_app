import { View, Text, Image, StyleSheet } from "react-native";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import COLORS from "../constants/colors";
import React from "react";

export default function cliqueView(clique = {}) {
  return (
    <View style={styles.container}>
      {clique?.image && (
        <Image
          source={{ uri: clique.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={[styles.innertext, { fontSize: 25 }]}>{clique.name}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.innertext}>{clique.address?.address1}</Text>
        <Text style={styles.innertext}>{clique.address?.address2}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.innertext}>{clique.city}</Text>
        <Text style={styles.innertext}>{clique.state}</Text>
        <Text style={styles.innertext}>{clique.zip}</Text>
      </View>
      <View style={styles.innerContainer}>
        <FaFacebook size={25} color={COLORS.blue} />
        <FaSquareXTwitter size={25} color={COLORS.darkGrey} />
        <CgWebsite size={25} color={COLORS.darkGrey} />
        <FaInstagramSquare size={25} color={COLORS.pink} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 3,
    marginBottom: 12,
    borderWidth: 2,
  },
  innerContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },

  innertext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
