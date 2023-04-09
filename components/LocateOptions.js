import { View, Text, Button, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../styles/Color";
import { MaterialIcons } from "@expo/vector-icons";
import PressableButton from "./PressableButton";
import styles from "../styles/profileStyles";

const LocateButton = () => {
  const navigation = useNavigation();

  const handleChooseLocation = () => {
    navigation.navigate("Map");
  };

  const handleLocateUser = () => {
    console.log("current user location");
  };
  const handleLocateMe = () => {
    Alert.alert(
      "Use Current Location?",
      "Or choose one on your own?",
      [
        {
          text: "Yes, locate me",
          onPress: handleLocateUser,
        },
        {
          text: "Let me choose the location",
          onPress: handleChooseLocation,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <PressableButton pressHandler={handleLocateMe}>
      <View style={styles.editLocation}>
        <MaterialIcons
          name="edit-location"
          size={22}
          color={Colors.buttonColor}
        />
        <Text style={styles.locateMe}>Locate Me</Text>
      </View>
    </PressableButton>
  );
};

const LocateOptions = () => {
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  async function verifyPermission() {
    console.log(permissionResponse);
    if (permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // // this will be user's choice:
    return permissionResult.granted;
  }

  return (
    <View>
      <LocateButton />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
          }}
          style={{ width: "100%", height: 200 }}
        />
      )}
    </View>
  );
};

export default LocateOptions;
export { LocateButton };
