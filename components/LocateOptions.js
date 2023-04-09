import { View, Text, Button, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../styles/Color";
import { MaterialIcons } from "@expo/vector-icons";
import PressableButton from "./PressableButton";
import styles from "../styles/profileStyles";

const LocateButton = ({ locateUserHandler }) => {
  const navigation = useNavigation();

  const handleChooseLocation = () => {
    navigation.navigate("Map");
  };

  const handleLocateMe = () => {
    Alert.alert(
      "Use Current Location?",
      "Or choose one on your own?",
      [
        {
          text: "Yes, locate me",
          onPress: locateUserHandler,
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

const StaticMap = ({ location }) => {
  return (
    <Image
      source={{
        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
      }}
      style={{ width: "100%", height: 200 }}
    />
  );
};

const LocateOptions = ({ location, setLocation }) => {
  // const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  const verifyPermission = async () => {
    console.log(permissionResponse);
    if (permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    // // this will be user's choice:
    return permissionResult.granted;
  };

  const locateUserHandler = async () => {
    console.log("current user location");
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give location permission");
      return;
    }
    try {
      const result = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.log("location handler ", err);
    }
  };

  return (
    <>
      <View>
        <LocateButton locateUserHandler={locateUserHandler} />
        {location && <StaticMap location={location} />}
      </View>
    </>
  );
};

export default LocateOptions;
export { LocateButton, StaticMap };
