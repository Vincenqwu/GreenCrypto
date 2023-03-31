import { Text, View, Pressable, StyleSheet } from "react-native";
import React from "react";

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

function TextButton({ style, pressHandler, text }) {
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
      <Text style={{ color: "#fff" }}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  buttonStyle: { justifyContent: "center" },
  pressedStyle: { backgroundColor: "red", opacity: 0.2 },
});

export default PressableButton;
export { TextButton };
