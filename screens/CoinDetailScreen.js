import {
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getCryptoData, getCryptoHistoricalData } from "../api/request";
import { FontAwesome } from "@expo/vector-icons";
import PressableButton from "../components/PressableButton";
import { createActivity, createPortfolio } from "../Firebase/firebaseHelper";
import { AntDesign } from "@expo/vector-icons";
import BuyPopup from "../components/BuyPopup";
import SellPopup from "../components/SellPopup";
import { MemorizedFilter } from "../components/FilterOptions";
import { auth, firestore } from "../Firebase/firebase-setup";
import { getUserWatchList, updateWatchList } from "../Firebase/firebaseHelper";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import {
  displayBalance,
  getOwnedCryptoAmountById,
  insufficientCashAlert,
  insufficientCryptoAlert,
  updatePortfolioWhenBuy,
  updatePortfolioWhenSell,
} from "../components/helper/balance";
import ChartView from "../components/ChartView";
import styles from "../styles/coinDetailsStyles";
import { Colors } from "../styles/Color";
import { scheduleNotificationHandler } from "../components/helper/NotificationManager";
import { color } from "react-native-reanimated";

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
  const [portfolio, setPortfolio] = useState(null);
  const [portfolioId, setPortfolioId] = useState(null);
  const [selectedCryptoAmount, setSelectedAmount] = useState(0);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setSelectedRangeValue("1");
    getCoinData();
    getCoinHistoricalData(coinId, 1, "hourly");
    setLoading(false);
  }, []);

  const currentUser = auth.currentUser;

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
        <View style={styles.headerTitle}>
          <Image
            source={{ uri: coinData?.image?.small }}
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}>
            {coinData?.symbol.toUpperCase()}
          </Text>
        </View>
      ),
      headerRight: () =>
        isAuthenticated && (
          <FontAwesome
            name="star"
            size={28}
            color={isWatchListed ? Colors.orangeColor : Colors.lightGrey}
            style={{ marginRight: 10 }}
            onPress={handleWatchListChange}
          />
        ),
      headerBackTitleVisible: false,
    });
  }, [navigation, coinData, isAuthenticated, isWatchListed]);

  useEffect(() => {
    setLoading(true);
    getCoinData();
    getCoinHistoricalData(coinId, 1, "hourly");
    setLoading(false);
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

  // load user portfolio to check crypto's list
  useEffect(() => {
    if (currentUser) {
      const unsubscribePortfolio = onSnapshot(
        query(
          collection(firestore, "portfolios"),
          where("uid", "==", currentUser.uid)
        ),
        async (querySnapshot) => {
          if (querySnapshot.empty) {
            // no data
            try {
              await createPortfolio(currentUser.uid);
            } catch (error) {
              console.log("create portfolio error: ", error);
            }
          } else {
            let newPortfolio = null;
            let snap = querySnapshot.docs.at(0);
            newPortfolio = snap.data();
            setPortfolio(newPortfolio);
            setPortfolioId(snap.id);
          }
        },
        (error) => {
          console.log("portfolio onsnapshot error: ", error);
        }
      );
      return () => {
        unsubscribePortfolio();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (portfolio) {
      if (portfolio) {
        let selectedAmount = getOwnedCryptoAmountById(portfolio, coinId);
        setSelectedAmount(selectedAmount);
      }
      console.log("current amount: ", selectedCryptoAmount);
    }
  }, [portfolio]);

  const handleWatchListChange = async () => {
    if (isWatchListed) {
      setIsWatchListed(false);
    } else {
      setIsWatchListed(true);
    }
    console.log("Change watchlist");
    await updateWatchList(auth.currentUser.uid, coinId);
  };

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
    { days: "90", label: "90d" },
    { days: "365", label: "1y" },
  ];

  const getCoinData = async () => {
    const responseData = await getCryptoData(coinId);
    setCoinData(responseData);
  };

  const getCoinHistoricalData = async (
    coinId,
    selectedRangeValue,
    interval
  ) => {
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
    market_data: { current_price, price_change_percentage_24h },
  } = coinData;

  const market_cap = coinData.market_data.market_cap.usd;
  const vol_24h = coinData.market_data.total_volume.usd;
  const circulating_supply = coinData.market_data.circulating_supply;
  const total_supply = coinData.market_data.total_supply;
  const fully_diluted_valuation =
    coinData.market_data.fully_diluted_valuation.usd;

  const { prices } = historicalData;
  const graphColor =
    current_price.usd > prices[0][1] ? Colors.priceUp : Colors.priceDown;
  const trendColor =
    price_change_percentage_24h < 0
      ? Colors.priceDown
      : Colors.priceUp || Colors.backgroundColor;

  async function handleBuy(amount) {
    const coinData = await getCryptoData(coinId);
    let currentPrice = coinData.market_data.current_price.usd;
    const newActivity = {
      action: "buy",
      coinId: coinId,
      coinName: coinData.name,
      amount: amount,
      price: currentPrice,
      timestamp: coinData.last_updated,
    };
    // check available cash before proceed
    let cost = parseFloat(amount) * parseFloat(currentPrice);
    if (cost > portfolio.cash) {
      insufficientCashAlert();
      return;
    }
    // increase crypto amount in portfolio
    try {
      await updatePortfolioWhenBuy(
        portfolio,
        portfolioId,
        coinId,
        amount,
        cost
      );
      await scheduleNotificationHandler(newActivity.action, amount, coinId);
    } catch (error) {
      console.log("add crypto error: ", error);
    }
    console.log(newActivity);
    createActivity(newActivity);
  }

  async function handleSell(amount) {
    const coinData = await getCryptoData(coinId);

    // check owned cryptos before proceed to sell
    console.log("portfolio list: ", portfolio.cryptos);
    const currentAmount = getOwnedCryptoAmountById(portfolio, coinId);
    console.log(coinId, "current amount: ", currentAmount, " selling:", amount);
    if (parseFloat(amount) > parseFloat(currentAmount)) {
      insufficientCryptoAlert();
      return;
    }

    let currentPrice = coinData.market_data.current_price.usd;
    const newActivity = {
      action: "sell",
      coinId: coinId,
      coinName: coinData.name,
      amount: amount,
      price: currentPrice,
      timestamp: coinData.last_updated,
    };
    // decrease crypto amount in portfolio
    try {
      await updatePortfolioWhenSell(
        portfolio,
        portfolioId,
        coinId,
        amount,
        currentPrice
      );
      await scheduleNotificationHandler(newActivity.action, amount, coinId);
    } catch (error) {
      console.log("reduce crypto error: ", error);
    }
    console.log(newActivity);
    createActivity(newActivity);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.nameStyle}>{name}</Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: trendColor }}
            >
              ${current_price.usd}
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
              color={Colors.bgColor}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>

        <ChartView data={prices} color={graphColor} />

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

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Market Cap</Text>
            <Text style={styles.infoItemValue}>
              {market_cap ? "$" + market_cap : "N/A"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Volume 24h</Text>
            <Text style={styles.infoItemValue}>
              {vol_24h ? "$" + vol_24h : "N/A"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Fully Diluted Valuation</Text>
            <Text style={styles.infoItemValue}>
              {fully_diluted_valuation ? "$" + fully_diluted_valuation : "N/A"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Circulating Supply</Text>
            <Text style={styles.infoItemValue}>
              {circulating_supply
                ? Number(circulating_supply).toFixed(2)
                : "N/A"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoItemTitle}>Total Supply</Text>
            <Text style={styles.infoItemValue}>
              {total_supply ? Number(total_supply).toFixed(2) : "N/A"}
            </Text>
          </View>
          {selectedCryptoAmount > 0 && (
            <View style={styles.infoItem}>
              <Text
                style={[{ color: Colors.hilightBlue }, styles.infoItemTitle]}
              >
                Amount Purchased
              </Text>
              <Text
                style={[
                  styles.infoItemValue,
                  { color: Colors.hilightBlue, fontWeight: "bold" },
                ]}
              >
                {displayBalance(selectedCryptoAmount, 6)}
              </Text>
            </View>
          )}
        </View>
        {currentUser && (
          <View style={styles.buttonContainer}>
            <PressableButton
              pressHandler={() => {
                setIsBuyPopupVisible(true);
                console.log("Buy Pressed");
              }}
              style={styles.buyButtonStyle}
            >
              <Text style={styles.buttonTextStyle}>Buy</Text>
            </PressableButton>
            {selectedCryptoAmount > 0 && (
              <PressableButton
                pressHandler={() => {
                  setIsSellPopupVisible(true);
                  console.log("Sell Pressed");
                }}
                style={styles.sellButtonStyle}
              >
                <Text style={styles.buttonTextStyle}>Sell</Text>
              </PressableButton>
            )}
            <BuyPopup
              visible={isBuyPopupVisible}
              onClose={() => setIsBuyPopupVisible(false)}
              onSubmit={handleBuy}
              coinId={coinId}
            />
            <SellPopup
              visible={isSellPopupVisible}
              onClose={() => setIsSellPopupVisible(false)}
              onSubmit={handleSell}
              coinId={coinId}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
