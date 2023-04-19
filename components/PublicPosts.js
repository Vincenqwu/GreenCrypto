import { FlatList, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from 'react'
import { getActionText, getActionColor } from "./helper/activitiesHelper";

export default function PublicPosts({ posts }) {

  const [location, setLocation] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  
  return (
    <FlatList
      contentContainerStyle={styles.scrollViewContentContainer}
      data={posts}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>User's ID: {item.userId}</Text>
            <Text style={styles.listItemText}>Action: {item.action}</Text>
            <Text style={styles.listItemText}>Coin: {item.coinId}</Text>
            <Text style={styles.listItemText}>Amount: {item.amount}</Text>
            <Text style={styles.listItemText}>Price: {item.price}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  listItem: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemText: {
    fontSize: 18,
    marginBottom: 5,
  },
  scrollViewContentContainer: {
    alignItems: "center",
  }
});
