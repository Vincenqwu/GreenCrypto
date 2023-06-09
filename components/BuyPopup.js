import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../styles/Color";

export default function BuyPopup({ visible, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    onSubmit(amount);
    onClose();
  };

  const handleCancel = () => {
    setAmount("");
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Enter the amount you want to buy:</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={(amount) => setAmount(amount)}
            placeholder="0.00"
            autoFocus
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  cancelButton: {
    backgroundColor: "#999",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: Colors.buttonColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
