import { View, Text } from 'react-native'
import React,{ useEffect } from 'react'

export default function CoinDetailScreen({ route, navigation }) {
  const { id, symbol } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: symbol,
    });
  }, [navigation, symbol]);

  return (
    <View>
      <Text>CoinDetailScreen</Text>
    </View>
  )
}