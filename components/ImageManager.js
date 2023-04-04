import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { CameraButton } from "./Profile";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ imageUriHandler }) => {
  const [imageUri, setImageUri] = useState("");
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    if (permissionInfo.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // this will be user's choice:
    return permissionResult.granted;
  }

  const takeImageHandler = async () => {
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give camera permission");
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (result.assets.length) {
        let uri = result.assets[0].uri;
        setImageUri(uri);
        imageUriHandler(uri);
      }
    } catch (err) {
      console.log("launch camera error ", err);
    }
  };
  return (
    <View>
      <CameraButton handler={takeImageHandler} />
    </View>
  );
};

export default ImageManager;
