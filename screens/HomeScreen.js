import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import CoinItem from "../components/CoinItem";
import { getMarketData } from "../api/request";
import { Colors } from "../styles/Color";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    if (coinsData) {
      setCoins((existingCoins) => [...existingCoins, ...coinsData]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View style={{ backgroundColor: Colors.bgColor }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        keyExtractor={(item) => item.id.toString()  + Date.now().toString()}
      />
    </View>
  );
};

export default HomeScreen;
