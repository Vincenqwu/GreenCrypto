import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { getAllCryptosData, getMarketData } from '../api/request';

export default function SearchCoinScreen() {
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
        if (coinId.includes(lowerInput) || coinName.includes(lowerInput) || coinSymbol.includes(lowerInput)) {
          results.push(allCoins[i].name + ' (' + allCoins[i].symbol + ')');
        }
      }
      setSearchResults(results);
    }
    else {
      setSearchResults([]);
    }
  }

  // Retrieeves all coins data from API
  useEffect(() => {
    async function fetchData() {
      const allCoinsData = await getMarketData();
      setAllCoins(allCoinsData);
    }
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchInput}
        onChangeText={(text) => {
          setSearchInput(text);
          handleSearch(text);
        }}
        placeholder="Enter a coin name"
      />
      <Text style={styles.resultText}>Search Results:</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <Text style={styles.resultItem}>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const arr = ["Hello", "World", "Vincent", "Vice"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

