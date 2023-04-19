import { View, Text, FlatList } from "react-native";
import React from "react";
import CoinItem from "./CoinItem";

const CoinsList = ({ coins }) => {
  return (
    <View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CoinsList;
