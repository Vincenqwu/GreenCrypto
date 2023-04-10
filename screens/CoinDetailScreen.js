import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getCryptoData, getCryptoHistoricalData } from "../api/request";
import { LineChart } from "react-native-wagmi-charts";
import { FontAwesome } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { createActivity } from "../Firebase/firebaseHelper";
import { Colors } from "../styles/Color";
import { AntDesign } from "@expo/vector-icons";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: coinData?.image?.small }}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <Text style={{ color: "white" }}>
            {coinData?.symbol.toUpperCase()}
          </Text>
        </View>
      ),
      headerRight: () => (
        <FontAwesome
          name="star-o"
          size={24}
          color="red"
          style={{ marginRight: 10 }}
        />
      ),
      headerBackTitleVisible: false,
    });
  }, [navigation, coinData]);

  useEffect(() => {
    getCoinData();
    getCoinHistoricalData(coinId, 1);
  }, []);

  const getCoinData = async () => {
    const responseData = await getCryptoData(coinId);
    setCoinData(responseData);
  };

  const getCoinHistoricalData = async (coinId, selectedRangeValue) => {
    const responseData = await getCryptoHistoricalData(
      coinId,
      selectedRangeValue
    );
    setHistoricalData(responseData);
  };

  if (!historicalData || !coinData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    name,
    image: { small },
    symbol,
    market_data: {
      current_price,
      price_change_percentage_24h,
      price_change_percentage_7d,
      price_change_percentage_14d,
      price_change_percentage_30d,
      price_change_percentage_1y,
    },
  } = coinData;

  const { prices } = historicalData;
  const graphColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const trendColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  async function buyCrypto(coinId, amount) {
    const coinData = await getCryptoData(coinId);

    Alert.alert(
      "Buy Bitcoin?",
      `Are you sure you want to buy 0.5 ${name} at $${coinData.market_data.current_price.usd}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const newActivity = {
              action: "buy",
              coinId: coinId,
              amount: amount,
              price: coinData.market_data.current_price.usd,
              timestamp: coinData.last_updated,
            };
            console.log(newActivity);
            createActivity(newActivity);
          },
        },
      ]
    );
  }

  const ChartView = gestureHandlerRootHOC(() => (
    <View>
      <View style={styles.priceContainer}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ fontSize: 16, color: trendColor }}>
            {current_price.usd}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: trendColor,
            paddingHorizontal: 3,
            paddingVertical: 8,
            borderRadius: 5,
            flexDirection: "row",
          }}
        >
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={"white"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={styles.priceChange}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <LineChart height={screenWidth / 2} width={screenWidth}>
          <LineChart.Path color={graphColor}>
            <LineChart.Gradient color={graphColor} />
          </LineChart.Path>
          <LineChart.CursorLine color={graphColor} />
          <LineChart.CursorCrosshair>
            <LineChart.Tooltip textStyle={styles.lineChart} />
            <LineChart.Tooltip position="bottom">
              <LineChart.DatetimeText />
            </LineChart.Tooltip>
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>
      <View style={styles.buttonContainer}>
        <PressableButton
          pressHandler={() => buyCrypto(coinId, 0.5)}
          style={styles.buyButtonStyle}
        >
          <Text style={styles.buttonTextStyle}>Buy Coin</Text>
        </PressableButton>
        <PressableButton
          pressHandler={() => console.log("Sell Finished")}
          style={styles.sellButtonStyle}
        >
          <Text style={styles.buttonTextStyle}>Sell Coin</Text>
        </PressableButton>
      </View>
    </View>
  ));

  return <ChartView />;
}

const styles = StyleSheet.create({
  lineChart: {
    backgroundColor: "black",
    borderRadius: 4,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    padding: 4,
  },
  buyButtonStyle: {
    marginTop: 10,
    backgroundColor: Colors.buttonColor,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  sellButtonStyle: {
    marginTop: 10,
    backgroundColor: Colors.removeButtonColor,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  priceChange: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
});
