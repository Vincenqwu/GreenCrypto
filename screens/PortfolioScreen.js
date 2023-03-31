import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { getCryptoData } from "../api/coinGeckoAPI"
import { createActivity } from "../Firebase/firebaseHelper"

export default function PortfolioScreen() {
  let testCoinId = "bitcoin";
  let testAmount = 0.1;

  async function buyCrypto(coinId, amount) {
    const coinData = await getCryptoData(coinId);
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
  return (
    <View>
      <Text>PortfolioScreen</Text>
      <Pressable
        onPress={() => buyCrypto(testCoinId, testAmount)}
        style={{ backgroundColor: "blue", padding: 10 }}
      >
        <Text style={{ color: "white" }}>Buy Crypto</Text>
      </Pressable>
    </View>
  )
}