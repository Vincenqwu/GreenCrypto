import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import {
  createPost,
  editActivity,
  deletePost,
} from "../Firebase/firebaseHelper";
import { Colors } from "../styles/Color";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getActionText, getActionColor } from "./helper/activitiesHelper";
import { getUserProfile } from "../Firebase/firebaseHelper";
import { auth } from "../Firebase/firebase-setup";

export default function MyActivities({ activities, posts }) {
  const navigation = useNavigation();
  const userId = auth.currentUser.uid;
  const defaultImgUri = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"

  function addToPost(activityItem) {
    Alert.alert(
      "Create post?",
      `Are you sure you want to create a post based on this activity?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const profile = await getUserProfile(userId);
            const location = profile.location? profile.location : 'Earth';
            const iconURI = profile.iconUri? profile.iconUri : defaultImgUri;
            
            const newPost = {
              activityId: activityItem.id,
              userId: activityItem.userId,
              action: activityItem.action,
              coinId: activityItem.coinId,
              coinName: activityItem.coinName,
              amount: activityItem.amount,
              price: activityItem.price,
              location: location,
              iconUri: iconURI,
              timestamp: activityItem.timestamp,
              postDate: new Date(),
            };
            createPost(newPost);
            editActivity(activityItem.id, { postCreated: true });
          },
        },
      ]
    );
  }

  function removeFromPost(activityId) {
    Alert.alert(
      "Remove post?",
      `Are you sure you want to remove the post based on this activity?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            editActivity(activityId, { postCreated: false });
            for (let i = 0; i < posts.length; i++) {
              if (posts[i].activityId === activityId) {
                deletePost(posts[i].id);
              }
            }
          },
        },
      ]
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={activities}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItem}>
            <View style={styles.actionContainer}>
              <View>
                <Text style={[styles.actionText, { color: getActionColor(item) }]}>
                  {getActionText(item)}
                </Text>
                <Text style={styles.timestampText}>
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('Details', { coinId: item.coinId })}>
                    <Text style={[styles.coinText, { flex: 1 }]}>{item.coinName}</Text>
                  </TouchableOpacity>
                  <Text style={styles.amountText}>Amount: {item.amount}</Text>
                  <Text style={styles.priceText}>Price: ${item.price}</Text>
                </View>

                {item.postCreated ? (
                  <Pressable
                    onPress={() => removeFromPost(item.id)}
                  >
                    <FontAwesome name="remove" size={28} color={Colors.removeButtonColor} />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => addToPost(item)}
                  >
                    <MaterialIcons name="create" size={28} color={Colors.buyColor} />
                  </Pressable>
                )}
              </View>

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
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  timestampText: {
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
  },
  priceText: {
    fontSize: 16,
    marginBottom: 5,
  }
});

