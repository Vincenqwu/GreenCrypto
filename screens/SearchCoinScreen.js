import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { getAllCryptosData, getMarketData } from '../api/request';

export default function SearchCoinScreen({ navigation }) {
  const [allCoins, setAllCoins] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (input) => {
    if (input.length > 0) {
      const lowerInput = input.toLowerCase();
      const results = [];
  
      for (let i = 0; i < allCoins.length; i++) {
        const coinId = allCoins[i].id.toLowerCase();
        const coinName = allCoins[i].name.toLowerCase();
        const coinSymbol = allCoins[i].symbol.toLowerCase();
        if (coinId.startsWith(lowerInput) || coinName.startsWith(lowerInput) || coinSymbol.startsWith(lowerInput)) {
          // results.push(allCoins[i].name + ' (' + allCoins[i].symbol + ')');
          results.push(allCoins[i]);
        }
      }
      setSearchResults(results);
    }
    else {
      setSearchResults([]);
    }
  }

  // Retrieves all coins data from API
  useEffect(() => {
    async function fetchData() {
      const allCoinsData = await getAllCryptosData();
      setAllCoins(allCoinsData);
    }
    fetchData();
  }, []);

  const handlePress = (coin) => {
    console.log(coin);
    navigation.navigate('Details', { id: coin.id, symbol: coin.symbol });
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text);
            handleSearch(text);
          }}
          placeholder="Enter a coin name"
        />
      </View>
      <Text style={styles.resultText}>Results:</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)} style={styles.resultItem}>
            <Text>{item.name} ({item.symbol})</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No results found.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultItem: {
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
  },
});
