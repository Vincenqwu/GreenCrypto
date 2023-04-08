import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import styles from "../styles/profileStyles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Color";
import { useNavigation } from "@react-navigation/native";

const ProfileButton = ({ title, handler }) => {
  return (
    <PressableButton style={styles.button} pressHandler={handler}>
      <Text style={styles.btnText}>{title}</Text>
    </PressableButton>
  );
};

const ProfileField = ({ label, value, isEditting = false }) => {
  const navigation = useNavigation();

  const onLocate = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={[styles.row, { flexDirection: "row" }]}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value} </Text>
      {isEditting && (
        <PressableButton pressHandler={onLocate}>
          <View style={pstyles.editLocation}>
            <MaterialIcons
              name="edit-location"
              size={22}
              color={Colors.buttonColor}
            />
            <Text style={pstyles.locateMe}>Locate Me</Text>
          </View>
        </PressableButton>
      )}
    </View>
  );
};

const CameraButton = ({ handler }) => {
  return (
    <>
      <PressableButton style={styles.camera} pressHandler={handler}>
        <AntDesign name="camera" size={24} color="black" />
      </PressableButton>
    </>
  );
};

const pstyles = StyleSheet.create({
  editLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1,
  },
  locateMe: {
    marginLeft: 5,
    color: Colors.buttonColor,
    textDecorationLine: "underline",
  },
});

export { ProfileButton, ProfileField, CameraButton };
