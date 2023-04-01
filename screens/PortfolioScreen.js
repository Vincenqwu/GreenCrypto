import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { getCryptoData } from "../api/coinGeckoAPI"
import { createActivity } from "../Firebase/firebaseHelper"
import PressableButton from "../components/PressableButton"; 

export default function PortfolioScreen() {
  let testCoinId = "bitcoin";
  let testAmount = 0.1;

  async function buyCrypto(coinId, amount) {
    const coinData = await getCryptoData(coinId);

    Alert.alert(
      "Buy Bitcoin?",
      `Are you sure you want to buy 0.1 bitcoin at $${coinData.market_data.current_price.usd}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
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
            }
            console.log(newActivity);
            createActivity(newActivity);

          }
        }
      ]
    );
  }

  return (
    <View>
      <PressableButton
        pressHandler={() => buyCrypto(testCoinId, testAmount)}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>Click to Buy Bitcoin</Text>
      </PressableButton>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "blue",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 180,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  pressedStyle: { backgroundColor: "red", opacity: 0.2 },
});
