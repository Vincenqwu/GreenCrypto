import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import WatchList from "../components/WatchList";
import styles from "../styles/styles";
import { isValuePositive } from "../components/helper/service";
import PortfolioList, {
  FundButton,
  PortfolioTab,
} from "../components/PortfolioList";
import { Colors } from "../styles/Color";
import AddFundField, { BalanceList } from "../components/AddFundField";

const Portfolio = () => {
  const [cash, setCash] = useState(2000);
  const [cashAdded, setCashAdded] = useState(0);
  const [profit, setProfit] = useState(-200);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showFundInput, setShowFundInput] = useState(false); // required
  const [currentBalance, setCurrentBalance] = useState(1000);

  const handleAddFunds = () => {
    setShowFundInput(true);
  };

  const availableFund = parseInt(cash) + parseInt(cashAdded);
  const totalBalance = parseInt(currentBalance) + availableFund;

  return (
    <View style={styles.portContainer}>
      <View style={styles.balanceWrapper}>
        <View style={styles.totalBalanceContainer}>
          <Text style={styles.totalBalanceLabel}>Total Balance:</Text>
          <Text style={styles.totalBalanceValue}>$ {totalBalance}</Text>
        </View>
        {!showFundInput && <FundButton addFund={handleAddFunds} />}
      </View>
      <BalanceList
        profit={profit}
        availableFund={availableFund}
        currentBalance={currentBalance}
      />
      {showFundInput && (
        <AddFundField
          setShowFundInput={setShowFundInput}
          setCashAdded={setCashAdded}
        />
      )}
      <PortfolioTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "portfolio" ? (
        <PortfolioList styles={styles.list} />
      ) : (
        <WatchList styles={styles.list} />
      )}
    </View>
  );
};

export default Portfolio;
