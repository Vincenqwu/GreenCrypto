import { View, Text, Button, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../styles/Color";
import { MaterialIcons } from "@expo/vector-icons";
import PressableButton from "./PressableButton";
import styles from "../styles/profileStyles";
import { constants } from "./helper/Constants";

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
  console.log("static map called", location);
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
  const [address, setAddress] = useState("");
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {
    getAddressFromCoords(location);
    // console.log("updated location: ", location);
  }, [location]);
  // useEffect(() => {
  //   console.log("updated location: ", location);
  // }, [location]);

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

  const getAddressFromCoords = async (coords) => {
    if (!coords) {
      return "No location selected";
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${MAPS_API_KEY}`;

    try {
      const response = await fetch(url);

      const data = await response.json();
      console.log(data);
      if (!data || data.status === "ZERO_RESULTS") {
        return null;
      }
      const fullAddress = data.results[0].formatted_address;
      const res = fullAddress.split(",")[1];
      setAddress(res);
      setLocation({ ...location, address: res });
    } catch (err) {
      console.log("fetch address error: ", err);
    }
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>
        {!location?.address ? constants.location : location.address}
      </Text>
      <LocateButton locateUserHandler={locateUserHandler} />
    </View>
  );
};

export default LocateOptions;
export { LocateButton, StaticMap };
