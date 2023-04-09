import { View, Text, Alert } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import styles, { colors } from "../styles/profileStyles";
import { AntDesign } from "@expo/vector-icons";
import LocateOptions, { LocateButton } from "./LocateOptions";

const ProfileButton = ({ title, handler }) => {
  return (
    <PressableButton style={styles.button} pressHandler={handler}>
      <Text style={styles.btnText}>{title}</Text>
    </PressableButton>
  );
};

const CameraButton = ({ handler }) => {
  return (
    <>
      <PressableButton style={styles.camera} pressHandler={handler}>
        <AntDesign name="camera" size={24} color={colors.navy} />
      </PressableButton>
    </>
  );
};

const ProfileField = ({ label, value, isEditting = false }) => {
  return (
    <View style={[styles.row, { flexDirection: "row" }]}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value} </Text>
      {isEditting && <LocateOptions />}
    </View>
  );
};

export { ProfileButton, ProfileField, CameraButton };
