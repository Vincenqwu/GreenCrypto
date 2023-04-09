import { View, Text, Button, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserLocation, saveUserLocation } from "../Firebase/firebaseHelper";
import styles from "../styles/profileStyles";
import PressableButton from "./PressableButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Color";

const LocationManager = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //   console.log("route", route.params);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const data = await getUserLocation();
        setLocation(data.location);
      } catch (err) {
        console.log("fetch lcoation ", err);
      }
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.selectedLocation);
    }
  }, [route]);

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
  async function locateUserHandler() {
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
  }
  function locationSelectionHandler() {
    //navigate to Map.js but we have no navigation prop
    // Todo: pass the location state variable if exists to be used as initialregion prop
    if (location) {
      navigation.navigate("Map", { currentLocation: location });
    } else {
      navigation.navigate("Map");
    }
  }
  const saveUser = async () => {
    await saveUserLocation({ location });
    navigation.navigate("Home");
  };

  return (
    <>
      <PressableButton pressHandler={locateUserHandler}>
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
      {/* {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
          }}
          style={{ width: "100%", height: 200 }}
        />
      )} */}
      {/* <Button
        title="Let me choose on the map!"
        onPress={locationSelectionHandler}
      />
      <Button title="Save Location" onPress={saveUser} /> */}
    </>
  );
};

export default LocationManager;
