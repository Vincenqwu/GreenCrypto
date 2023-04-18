import { View, Text } from "react-native";
import React from "react";

const CoinsList = ({ coins }) => {
  return (
    <View>
      <Text>CoinsList</Text>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CoinsList;
