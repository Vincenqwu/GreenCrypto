import { View, Text } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import styles from "../styles/profileStyles";

const ProfileButton = ({ title, handler }) => {
  return (
    <PressableButton style={styles.button} pressHandler={handler}>
      <Text style={styles.btnText}>{title}</Text>
    </PressableButton>
  );
};

const ProfileField = ({ label, value }) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value} </Text>
      </View>
    </>
  );
};

export { ProfileButton, ProfileField };
