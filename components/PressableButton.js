import { Text, View, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/Color";

const PressableButton = ({ style, pressHandler, children }) => {
  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.buttonStyle,
          style,
          pressed ? styles.pressedStyle : null,
        ];
      }}
      onPress={pressHandler}
    >
      <View>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: { justifyContent: "center" },
  pressedStyle: { backgroundColor: "red", opacity: 0.2 },
});

export default PressableButton;
