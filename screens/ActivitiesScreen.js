import {
View,
StyleSheet,
ActivityIndicator,
Dimensions,
} from "react-native"
import React, { useState, useEffect } from "react"
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { auth, firestore } from "../Firebase/firebase-setup";
import PublicPosts from "../components/PublicPosts";
import MyActivities from "../components/MyActivities";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors } from "../styles/Color";

export default function ActivitiesScreen() {
  const [posts, setPosts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'myActivities', title: 'My Activities' },
    { key: 'publicPosts', title: 'Public Activities' },
  ]);


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

  const renderScene = SceneMap({
    myActivities: () => <MyActivities activities={activities} posts={posts} />,
    publicPosts: () => <PublicPosts posts={posts} />,
  });

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" />
        :
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          indicatorStyle={{ fontWeight: "bold" }}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={styles.tabStyle}
              labelStyle={{ color: "white", fontWeight: "bold", fontSize: 12}}
              indicatorStyle={{ backgroundColor: "orange" }}
            />
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingBottom: 70,
  },
  tabStyle: {
    backgroundColor: Colors.subBarColor,
    color: "white",
  },
});
