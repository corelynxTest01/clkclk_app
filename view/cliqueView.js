import { View, Text, Image, StyleSheet, Linking, Pressable } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
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
      {clique?.phone &&
        <View style={styles.innerContainer}>
          <Pressable
            onPress={() => Linking.openURL(`tel:${clique.phone}`)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }]
              }
            ]}
          >
            <Text style={[styles.innertext, { color: COLORS.blue }]}>
              {clique.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
            </Text>
          </Pressable>
        </View>
      }
      <View style={styles.innerIcons}>
        {clique?.facebook &&
          <Pressable
            onPress={() => Linking.openURL(clique.facebook)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }]
              }
            ]}
          >
            <FontAwesome size={25} name="facebook-square" color={COLORS.blue} />
          </Pressable>
        }
        {clique?.twitter &&
          <Pressable
            onPress={() => Linking.openURL(clique.twitter)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }]
              }
            ]}
          >
            <FontAwesome size={25} name="twitter-square" color={COLORS.darkGrey} />
          </Pressable>
        }
        {clique?.website &&
          <Pressable
            onPress={() => Linking.openURL(clique.website)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }]
              }
            ]}
          >
            <Ionicons size={25} name="globe-outline" color={COLORS.darkGrey} />
          </Pressable>
        }
        {clique?.instagram &&
          <Pressable
            onPress={() => Linking.openURL(clique.instagram)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }]
              }
            ]}
          >
            <FontAwesome size={25} name="instagram" color={COLORS.pink} />
          </Pressable>
        }
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

  innerIcons: {
    flex: 1,
    gap: 20,
    marginTop: 10,
    flexDirection: "row"
  },

  innertext: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
