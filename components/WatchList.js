import { View, Text } from "react-native";
import React, { useEffect } from "react";
import CoinsList from "./CoinsList";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { auth, firestore } from "../Firebase/firebase-setup";
import { getCryptoDetailsBasedOnIds } from "../api/request";

const WatchList = ({ watchlist, setWatchlist }) => {
  const currentUser = auth.currentUser;
  useEffect(() => {
    const unsubscribeWatchlist = onSnapshot(
      query(
        collection(firestore, "profiles"),
        where("uid", "==", currentUser?.uid)
      ),
      async (querySnapshot) => {
        if (!querySnapshot.empty) {
          let snap = querySnapshot.docs.at(0);
          let currentWatchlist = snap.data().watchList;

          if (currentWatchlist.length === 0) {
            setWatchlist([]);
            return;
          }
          getCryptoDetailsBasedOnIds(currentWatchlist).then((res) => {
            setWatchlist(res);
          });
        }
      },
      (error) => {
        console.log("watchlist onsnapshot error: ", error);
      }
    );
    return () => {
      if (!currentUser.uid) return;
      unsubscribeWatchlist();
    };
  }, [currentUser]);

  return (
    <View>
      <Text>WatchList</Text>
      <CoinsList coins={watchlist} />
    </View>
  );
};

export default WatchList;
