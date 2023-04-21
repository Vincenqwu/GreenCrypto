import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../styles/Color";
import { isValuePositive } from "./helper/service";
import { updatePortfolio } from "../Firebase/firebaseHelper";
import { displayBalance } from "./helper/balance";

const BalanceList = ({ profit, availableFund, currentBalance }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Cash Available:</Text>
        <Text style={styles.headerValue}>
          $ {displayBalance(availableFund)}
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerLabel}>Crypto Assests:</Text>
        <Text style={styles.headerValue}>
          $ {displayBalance(currentBalance)}
        </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          {isValuePositive(profit) ? "Profit" : "Loss"}:
        </Text>
        <Text
          style={[
            styles.headerValue,
            isValuePositive(profit)
              ? {
                  color: "green",
                }
              : { color: "red" },
          ]}
        >
          {isValuePositive(profit) ? "+" : "-"}${" "}
          {displayBalance(Math.abs(profit))}
        </Text>
      </View>
    </>
  );
};

const AddFundField = ({ portfolioId, portfolio, setShowFundInput }) => {
  const [fundAmount, setFundAmount] = useState("");

  const handleConfirmAddFunds = () => {
    let cash = parseFloat(portfolio.cash);
    let fund = parseFloat(portfolio.fund);
    cash += parseFloat(fundAmount);
    fund += parseFloat(fundAmount);
    let newPortfolio = { ...portfolio, cash: cash, fund: fund };
    updatePortfolio(portfolioId, newPortfolio);

    setShowFundInput(false);
    setFundAmount(0);
  };

  const handleCancelAddFunds = () => {
    setShowFundInput(false);
    setFundAmount("");
  };
  return (
    <View style={styles.fundInputContainer}>
      <TextInput
        style={styles.fundInput}
        placeholder="Enter funds amount in USD"
        value={fundAmount}
        onChangeText={setFundAmount}
        keyboardType="numeric"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.portfolioBtn, { backgroundColor: Colors.hilightBlue }]}
          onPress={handleConfirmAddFunds}
        >
          <Text style={styles.portfolioBtnLabel}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.portfolioBtn, { backgroundColor: Colors.lightGreen }]}
          onPress={handleCancelAddFunds}
        >
          <Text style={styles.portfolioBtnLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddFundField;
export { BalanceList };
