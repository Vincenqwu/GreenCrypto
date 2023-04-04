import { View, Alert } from "react-native";
import React, { useState } from "react";
import { CameraButton } from "./Profile";
import * as ImagePicker from "expo-image-picker";

const ImageManager = ({ imageUriHandler }) => {
  const [imageUri, setImageUri] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCameraPress = () => {
    Alert.alert(
      "Choose an image source",
      "",
      [
        { text: "Camera", onPress: takeImageHandler },
        { text: "Photo Library", onPress: openImagePicker },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const [cameraPermissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function verifyCameraPermission() {
    if (cameraPermissionInfo.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // this will be user's choice:
    return permissionResult.granted;
  }

  const [galleryPermissionInfo, requestGalleryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  async function verifyGalleryPermission() {
    if (galleryPermissionInfo.granted) {
      return true;
    }
    const permissionResult = await requestGalleryPermission();
    // this will be user's choice:
    return permissionResult.granted;
  }

  const takeImageHandler = async () => {
    const permissionReceived = await verifyCameraPermission();
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

  const openImagePicker = async () => {
    const permissionReceived = await verifyGalleryPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give gallery permission");
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.assets.length) {
        let uri = result.assets[0].uri;
        setImageUri(uri);
        imageUriHandler(uri);
      }
    } catch (err) {
      console.log("gallery error ", err);
    }
  };
  return (
    <View>
      <CameraButton handler={handleCameraPress} />
    </View>
  );
};

export default ImageManager;
