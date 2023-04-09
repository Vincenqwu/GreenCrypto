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

const StaticProfileField = ({ profile }) => {
  return (
    <>
      <ProfileField label={"Username"} value={profile.username} />
      <ProfileField label={"Bio"} value={profile.bio} />
      <ProfileField label={"Location"} value={"Earth"} />
    </>
  );
};

const ProfileField = ({ label, value, isEditting = false }) => {
  return (
    <View style={styles.row}>
      <FieldPair label={label} value={value} />
      {isEditting && <LocateOptions />}
    </View>
  );
};

const FieldPair = ({ label, value }) => {
  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value} </Text>
    </>
  );
};

const EditableProfileField = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <FieldPair label={label} value={value} />
      <LocateButton />
    </View>
  );
};

export {
  ProfileButton,
  StaticProfileField,
  CameraButton,
  ProfileField,
  FieldPair,
  EditableProfileField,
};
