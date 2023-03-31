import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from 'react'
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { auth, firestore } from "../Firebase/firebase-setup";

export default function ActivityListScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "activities"),
        where("userId", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setPosts([]);
        } else {
          let docs = [];
          // update posts array
          querySnapshot.docs.forEach((snap) => {
            console.log(snap.id);
            docs.push({ ...snap.data(), id: snap.id });
          });
          console.log(docs);
          setPosts(docs);
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

  return (
    <View>
      <Text>ActivityListScreen</Text>
      <FlatList
          contentContainerStyle={styles.scrollViewContentContainer}
          data={posts}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.userId}</Text>
                <Text>{item.action}</Text>
                <Text>{item.coinId}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.price}</Text>
            </View>
            );
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    alignItems: "center",
  },
});
