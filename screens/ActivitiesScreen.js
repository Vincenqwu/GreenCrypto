import { View, Text, Switch, StyleSheet, ActivityIndicator } from "react-native"
import React, { useState, useEffect } from "react"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { auth, firestore } from "../Firebase/firebase-setup";
import PublicPosts from "../components/PublicPosts";
import MyActivities from "../components/MyActivities";

export default function ActivitiesScreen() {
  const [currentPage, setCurrentPage] = useState("myActivities");
  const [posts, setPosts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribePosts = onSnapshot(
      query(
        collection(firestore, "posts"),
        orderBy("timestamp", "desc"),
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setPosts([]);
        } else {
          let docs = [];
          // update activities array
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
    const unsubscribeActivities = onSnapshot(
      query(
        collection(firestore, "activities"),
        where("userId", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc"),
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          setActivities([]);
        } else {
          let docs = [];
          // update activities array
          querySnapshot.docs.forEach((snap) => {
            // console.log(snap.id);
            docs.push({ ...snap.data(), id: snap.id });
          });
          setActivities(docs);
        }
        setLoading(false);
      },
      (error) => {
        console.log("onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribePosts();
      unsubscribeActivities();
    };
  }, []);

  const handlePageChange = (value) => {
    setCurrentPage(value ? "PublicPosts" : "myActivities");
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchTitles}>{currentPage === "myActivities" ? "My Activities" : "Public Posts"}</Text>
        <Switch value={currentPage === "PublicPosts"} onValueChange={handlePageChange} />
      </View>
      {loading ? <ActivityIndicator size="large" color="#0000ff" />
        :
        (currentPage === "myActivities" ? <MyActivities activities={activities} posts={posts} /> : <PublicPosts posts={posts} />)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingBottom: 100,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  switchTitles: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
