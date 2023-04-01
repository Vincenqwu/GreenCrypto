import { FlatList, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from 'react'
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { auth, firestore } from "../Firebase/firebase-setup";
import { createPost, editActivity, deletePost } from "../Firebase/firebaseHelper";

export default function MyActivities( { posts }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "activities"),
        where("userId", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setActivities([]);
        } else {
          let docs = [];
          // update activities array
          querySnapshot.docs.forEach((snap) => {
            console.log(snap.id);
            docs.push({ ...snap.data(), id: snap.id });
          });
          console.log(docs);
          setActivities(docs);
        }
      },
      (error) => {
        console.log("onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  function addToPost(activityItem) {
    Alert.alert(
      "Create post?",
      `Are you sure you want to create a post based on this activity?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            const newPost = {
              activityId: activityItem.id,
              action: activityItem.action,
              coinId: activityItem.coinId,
              amount: activityItem.amount,
              price: activityItem.price,
              timestamp: activityItem.timestamp,
              postDate: new Date(),
            }
            createPost(newPost);
            editActivity(activityItem.id, { postCreated: true });

          }
        }
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
          style: "cancel"
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
          }
        }
      ]
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.scrollViewContentContainer}
      data={activities}
      renderItem={({ item }) => {
        return (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>User's ID: {item.userId}</Text>
            <Text style={styles.listItemText}>Action: {item.action}</Text>
            <Text style={styles.listItemText}>Coin: {item.coinId}</Text>
            <Text style={styles.listItemText}>Amount: {item.amount}</Text>
            <Text style={styles.listItemText}>Price: {item.price}</Text>
            <Text style={styles.listItemText}>Date: {item.timestamp}</Text>
            {item.postCreated ?
              <Pressable
                onPress={() => removeFromPost(item.id)}
                style={styles.removePostButton}
              >
                <Text style={styles.createPostButtonText}>Remove Post</Text>
              </Pressable>
              :

              <Pressable
                onPress={() => addToPost(item)}
                style={styles.createPostButton}
              >
                <Text style={styles.createPostButtonText}>Create Post</Text>
              </Pressable>


            }

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
  },
  createPostButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  createPostButtonText: {
    color: "white",
    textAlign: "center",
  },
  removePostButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
