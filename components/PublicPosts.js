import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import React from 'react'
import { getActionText, getActionColor } from "./helper/activitiesHelper";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/activitiyStyles";

export default function PublicPosts({ posts }) {
  const navigation = useNavigation();

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
              <View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.labelText}>Coin:</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { coinId: item.coinId })}>
                      <Text style={styles.contentText}>{item.coinName}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.labelText}>Amount:</Text>
                    <Text style={styles.contentText}>{item.amount}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.labelText}>Price:</Text>
                    <Text style={styles.contentText}>${item.price}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.locationContainer}>
                <Ionicons name="location-sharp" size={18} color="#999" />
                <Text style={styles.locationText}>
                  {item.location ? " " + item.location : " Unknown"}
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
