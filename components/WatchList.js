import { View, Text } from "react-native";
import React from "react";
import coins from "../assets/data/cryptos-dup.json";
import CoinsList from "./CoinsList";

const WatchList = () => {
  return (
    <View>
      <Text>WatchList</Text>
      <CoinsList coins={coins} />
    </View>
  );
};

export default WatchList;
