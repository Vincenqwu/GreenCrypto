import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../styles/Color";
import { isValuePositive } from "./helper/service";

const BalanceList = ({ profit, availableFund, currentBalance }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Available Fund:</Text>
        <Text style={styles.headerValue}>$ {availableFund}</Text>
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
          {isValuePositive(profit) ? "+" : "-"}$ {Math.abs(profit)}
        </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Assests:</Text>
        <Text style={styles.headerValue}>$ {currentBalance}</Text>
      </View>
    </>
  );
};

const AddFundField = ({ setShowFundInput, setCashAdded }) => {
  const [fundAmount, setFundAmount] = useState("");

  const handleConfirmAddFunds = () => {
    // add funds logic here
    setShowFundInput(false);
    setFundAmount("");
    setCashAdded((prev) => prev + parseInt(fundAmount));
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
