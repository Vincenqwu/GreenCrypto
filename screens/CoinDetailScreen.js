import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getCryptoData, getCryptoHistoricalData } from "../api/request";
import { LineChart } from "react-native-wagmi-charts";
import { FontAwesome } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { createActivity } from "../Firebase/firebaseHelper";
import { Colors } from "../styles/Color";
import { AntDesign } from "@expo/vector-icons";
import BuyPopup from "../components/BuyPopup";
import SellPopup from "../components/SellPopup";
import { MemorizedFilter } from "../components/FilterOptions";
import { auth } from "../Firebase/firebase-setup";
import { getUserWatchList, updateWatchList } from "../Firebase/firebaseHelper";
import { onAuthStateChanged } from "firebase/auth";


export default function CoinDetailScreen({ route, navigation }) {
  const { coinId } = route.params;
  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [selectedRangeValue, setSelectedRangeValue] = useState("1");
  const [isBuyPopupVisible, setIsBuyPopupVisible] = useState(false);
  const [isSellPopupVisible, setIsSellPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(auth.currentUser);
  const [isWatchListed, setIsWatchListed] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

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
        isAuthenticated &&
        (
          <FontAwesome
            name={isWatchListed ? "star" : "star-o"}
            size={24}
            color={isWatchListed ? "#FFBF00" : "white"}
            style={{ marginRight: 10 }}
            onPress={handleWatchListChange}
          />
        )
      ),
      headerBackTitleVisible: false,
    });
  }, [navigation, coinData, isAuthenticated, isWatchListed]);

  useEffect(() => {
    getCoinData();
    getCoinHistoricalData(coinId, 1, "hourly");
  }, []);

  // Load user watchlist to check if coin is already in watchlist
  useEffect(() => {
    if (isAuthenticated) {
      const checkWatchList = async () => {
        const watchList = await getUserWatchList(auth.currentUser.uid);
        if (watchList?.includes(coinId)) {
          setIsWatchListed(true);
        }
      };
      checkWatchList();
    }
  }, [isAuthenticated]);

  const handleWatchListChange = async () => {
    if (isWatchListed) {
      setIsWatchListed(false);
    } else {
      setIsWatchListed(true);
    }
    console.log("Change watchlist")
    await updateWatchList(auth.currentUser.uid, coinId);
  }

  const onFilterOptionChange = (range) => {
    setSelectedRangeValue(range);
    if (range > 30) {
      getCoinHistoricalData(coinId, range, "daily");
      return;
    }

    getCoinHistoricalData(coinId, range, "hourly");
  };

  const handleFilterOption = React.useCallback(
    (range) => onFilterOptionChange(range),
    []
  );

  const filterArray = [
    { days: "1", label: "1d" },
    { days: "7", label: "7d" },
    { days: "30", label: "30d" },
    { days: "365", label: "1y" },
    { days: "max", label: "All" },
  ];

  const getCoinData = async () => {
    setLoading(true);
    const responseData = await getCryptoData(coinId);
    setCoinData(responseData);
    setLoading(false);
  };

  const getCoinHistoricalData = async (coinId, selectedRangeValue, interval) => {
    const responseData = await getCryptoHistoricalData(
      coinId,
      selectedRangeValue,
      interval
    );
    setHistoricalData(responseData);
  };

  if (loading || !historicalData || !coinData) {
    return <ActivityIndicator size="large" />;
  }


  const {
    name,
    image: { small },
    symbol,
    market_data: {
      current_price,
      price_change_percentage_24h,
    },
  } = coinData;

  const market_cap = coinData.market_data.market_cap.usd;
  const vol_24h = coinData.market_data.total_volume.usd;
  const circulating_supply = coinData.market_data.circulating_supply;
  const total_supply = coinData.market_data.total_supply;
  const max_supply = coinData.market_data.max_supply;
  const fully_diluted_valuation = coinData.market_data.fully_diluted_valuation.usd;

  const { prices } = historicalData;
  const graphColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const trendColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  async function handleBuy(amount) {
    const coinData = await getCryptoData(coinId);
    const newActivity = {
      action: "buy",
      coinId: coinId,
      amount: amount,
      price: coinData.market_data.current_price.usd,
      timestamp: coinData.last_updated,
    };
    console.log(newActivity);
    createActivity(newActivity);
  }

  async function handleSell(amount) {
    const coinData = await getCryptoData(coinId);
    const newActivity = {
      action: "sell",
      coinId: coinId,
      amount: amount,
      price: coinData.market_data.current_price.usd,
      timestamp: coinData.last_updated,
    };
    console.log(newActivity);
    createActivity(newActivity);
  }

  return (
    // <ChartView />
    <SafeAreaView style={styles.container}>
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.nameStyle}>{name}</Text>
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
      <View style={styles.filterContainer}>
        {filterArray.map((item) => (
          <MemorizedFilter
            days={item.days}
            label={item.label}
            selectedRange={selectedRangeValue}
            setSelectedRange={handleFilterOption}
            key={item.label}
          />
        ))}
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
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Market Cap</Text>
          <Text style={styles.infoItemValue}>{market_cap ? "$" + market_cap : "N/A"} </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Volume 24h</Text>
          <Text style={styles.infoItemValue}>{vol_24h ? "$" + vol_24h : "N/A"} </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Fully Diluted Valuation</Text>
          <Text style={styles.infoItemValue}>{fully_diluted_valuation ? "$" + fully_diluted_valuation : "N/A"} </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Circulating Supply</Text>
          <Text style={styles.infoItemValue}>{circulating_supply ? circulating_supply : "N/A"}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Total Supply</Text>
          <Text style={styles.infoItemValue}>{total_supply ? total_supply : "N/A"}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoItemTitle}>Max Supply</Text>
          <Text style={styles.infoItemValue}>{max_supply ? max_supply : "N/A"}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton
          pressHandler={() => {
            setIsBuyPopupVisible(true)
            console.log("Buy Pressed")
          }}
          style={styles.buyButtonStyle}
        >
          <Text style={styles.buttonTextStyle}>Buy Coin</Text>
        </PressableButton>
        <PressableButton
          pressHandler={() => {
            setIsSellPopupVisible(true)
            console.log("Sell Pressed")
          }}
          style={styles.sellButtonStyle}
        >
          <Text style={styles.buttonTextStyle}>Sell Coin</Text>
        </PressableButton>
        <BuyPopup visible={isBuyPopupVisible} onClose={() => setIsBuyPopupVisible(false)} onSubmit={handleBuy} />
        <SellPopup visible={isSellPopupVisible} onClose={() => setIsSellPopupVisible(false)} onSubmit={handleSell} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
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
    justifyContent: "space-around",
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
  infoContainer: {
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoItemValue: {
    fontSize: 16,
    color: '#555',
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
