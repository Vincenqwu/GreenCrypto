import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from 'react'
import { getActionText, getActionColor } from "./helper/activitiesHelper";
import { Ionicons } from '@expo/vector-icons';

export default function PublicPosts({ posts }) {

  function getNameFromEmail(email) {
    if (!email) {
      return "user";
    }
    const parts = email.split("@");
    return parts[0];
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={posts}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItem}>

            <View style={styles.headerContainer}>
              <Image source={{ uri: item.iconUri }} style={styles.userIcon} />
              <Text style={styles.emailName}>{getNameFromEmail(item.email)}</Text>
            </View>
            <View style={styles.actionContainer}>
              <Text style={[styles.actionText, { color: getActionColor(item) }]}>
                {getActionText(item)}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('Details', { coinId: item.coinId })}>
                    <Text style={[styles.coinText, { flex: 1 }]}>{item.coinName}</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.labelText}>Amount:</Text>
                    <Text style={styles.amountText}>{item.amount}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.labelText}>Price:</Text>
                    <Text style={styles.priceText}>${item.price}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.locationContainer}>
                <Ionicons name="location-sharp" size={18} color="#999" />
                <Text style={styles.locationText}>
                  {item.location ? item.location : "Unknown"}
                </Text>
              </View>
              <Text style={styles.timestampText}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  actionContainer: {
    justifyContent: 'space-between',
    marginLeft: 45,
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  timestampText: {
    marginTop: 5,
    fontSize: 14,
    color: '#999',
  },
  coinText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  amountText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  labelText: {
    width: 80,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  emailName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#999",
  },
});

