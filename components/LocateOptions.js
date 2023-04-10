import { View, Text, Button, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../styles/Color";
import { MaterialIcons } from "@expo/vector-icons";
import PressableButton from "./PressableButton";
import styles from "../styles/profileStyles";

import { getAddressFromCoords } from "./helper/service";
import { constants } from "./helper/service";

const LocateButton = ({ locateUserHandler, coordinate }) => {
  const navigation = useNavigation();

  const handleChooseLocation = () => {
    if (coordinate) {
      navigation.navigate("Map", { currentLocation: coordinate });
    } else {
      navigation.navigate("Map");
    }
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
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
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

const LocateOptions = ({ profile, setCoordinate, location, setLocation }) => {
  const originalLocation = profile.location;
  const coordinate = profile.coordinate;

  const [currentLocation, setCurrentLocation] = useState(originalLocation);

  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const permissionResult = await requestPermission();
    return permissionResult.granted;
  };

  const locateUserHandler = async () => {
    const permissionReceived = await verifyPermission();
    if (!permissionReceived) {
      Alert.alert("You need to give location permission");
      return;
    }
    try {
      const result = await Location.getCurrentPositionAsync();
      let coord = {
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      };
      setCoordinate(coord);

      const address = await getAddressFromCoords(coord);
      setLocation(address);
      setCurrentLocation(address);
    } catch (err) {
      console.log("location handler ", err);
    }
  };

  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
    }
  }, [location]);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>
        {!currentLocation ? constants.location : currentLocation}
      </Text>
      <LocateButton
        locateUserHandler={locateUserHandler}
        coordinate={coordinate}
      />
    </View>
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

export default LocateOptions;
export { LocateButton, StaticMap };
