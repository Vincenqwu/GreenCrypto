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
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons'; 

export default function MyActivities({ activities, posts }) {
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
          onPress: () => {
            const newPost = {
              activityId: activityItem.id,
              userId: activityItem.userId,
              action: activityItem.action,
              coinId: activityItem.coinId,
              amount: activityItem.amount,
              price: activityItem.price,
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

  function getActionText(activity) {
    if (activity.action === "buy") {
      const totalPrice = (activity.price * activity.amount).toFixed(2);
      return `Bought ${activity.amount} ${activity.coinId} at $${totalPrice}`;
    } else if (activity.action === "sell") {
      const totalPrice = (activity.price * activity.amount).toFixed(2);
      return `Sold ${activity.amount} ${activity.coinId} at $${totalPrice}`;
    }
  }


  function getActionColor(activity) {
    if (activity.action === "buy") {
      return Colors.buyColor;
    } else if (activity.action === "sell") {
      return Colors.sellColor;
    }
  }

  return (
    <FlatList
      contentContainerStyle={styles.scrollViewContentContainer}
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
                  <Text style={[styles.coinText, { flex: 1 }]}>{item.coinName}</Text>
                  <Text style={styles.amountText}>Amount: {item.amount}</Text>
                  <Text style={styles.priceText}>Price: ${item.price}</Text>
                </View>

                {item.postCreated ? (
                  <Pressable
                    onPress={() => removeFromPost(item.id)}
                    style={styles.removePostButton}
                  >
                    <FontAwesome name="remove" size={28} color={Colors.removeButtonColor}/>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => addToPost(item)}
                    style={styles.createPostButton}
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
  scrollViewContentContainer: {
    paddingVertical: 10,
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
    fontSize: 16,
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
  },
  createPostButton: {
    marginRight: 10,
  },
  removePostButton: {
    marginRight: 10,
  },
});

