import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PortfoliList from "../components/PortfoliList";
import WatchList from "../components/WatchList";

const Portfolio = () => {
  const [currentBalance, setCurrentBalance] = useState(1000);
  const [profitLoss, setProfitLoss] = useState(100);
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.headerLabel}>Current Balance:</Text>
          <Text style={styles.headerValue}>$ {currentBalance}</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerLabel}>Profit/Loss:</Text>
          <Text
            style={[
              styles.headerValue,
              profitLoss > 0 ? styles.green : styles.red,
            ]}
          >
            {profitLoss > 0 ? "+" : "-"}$ {Math.abs(profitLoss)}
          </Text>
        </View>
      </View>
      <View style={styles.tabs}>
        <View
          style={[
            styles.tabItem,
            activeTab === "portfolio" ? styles.activeTab : null,
          ]}
        >
          <Text
            style={styles.tabLabel}
            onPress={() => setActiveTab("portfolio")}
          >
            Portfolio
          </Text>
        </View>
        <View
          style={[
            styles.tabItem,
            activeTab === "watchlist" ? styles.activeTab : null,
          ]}
        >
          <Text
            style={styles.tabLabel}
            onPress={() => setActiveTab("watchlist")}
          >
            WatchList
          </Text>
        </View>
      </View>
      {activeTab === "portfolio" ? <PortfoliList /> : <WatchList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },
  headerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  headerValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#ddd",
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  activeTab: {
    backgroundColor: "#f2f2f2",
  },
});

export default Portfolio;
