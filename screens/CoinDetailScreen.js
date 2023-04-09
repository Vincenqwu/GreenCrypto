import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCryptoData, getCryptoHistoricalData } from '../api/request'
import { LineChart } from "react-native-wagmi-charts";
import { FontAwesome } from '@expo/vector-icons';

export default function CoinDetailScreen({ route, navigation }) {
  const { coinId } = route.params;
  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [selectedRangeValue, setSelectedRangeValue] = useState(1);

  const screenWidth = Dimensions.get("window").width;


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: coinData?.image?.small }} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text>{coinData?.symbol}</Text>
        </View>
      ),
      headerRight: () => (
        <FontAwesome name="star-o" size={24} color="red" style={{ marginRight: 10 }} />
      ),
    });
  }, [navigation, coinData]);

  useEffect(() => {
    getCoinData();
    getCoinHistoricalData(coinId, 1);
  }, []);

  const getCoinData = async () => {
    const responseData = await getCryptoData(coinId);
    setCoinData(responseData);
  }

  const getCoinHistoricalData = async (coinId, selectedRangeValue) => {
    const responseData = await getCryptoHistoricalData(
      coinId,
      selectedRangeValue
    );
    setHistoricalData(responseData);
  };

  if (!historicalData || !coinData ) {
    return <ActivityIndicator size="large" />;
  }

  const {
    image: { small },
    symbol,
    market_data: {
      current_price,
    },
  } = coinData;

  const { prices } = historicalData;
  const graphColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";

  return (
    <View>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <LineChart height={screenWidth / 2} width={screenWidth}>
          <LineChart.Path color={graphColor} />
          <LineChart.CursorLine color={graphColor} />
        </LineChart>
        <LineChart.PriceText />
        <LineChart.DatetimeText />
      </LineChart.Provider>
    </View>
  )
}
