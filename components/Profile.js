import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import styles, { colors } from "../styles/profileStyles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Color";
import { useNavigation } from "@react-navigation/native";
import LocationManager from "./LocationManager";

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
          <View style={styles.editLocation}>
            <MaterialIcons
              name="edit-location"
              size={22}
              color={Colors.buttonColor}
            />
            <Text style={styles.locateMe}>Locate Me</Text>
          </View>
          <LocationManager />
        </PressableButton>
      )}
    </View>
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

export { ProfileButton, ProfileField, CameraButton };
