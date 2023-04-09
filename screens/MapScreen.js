import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "../styles/styles";

const MapScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  console.log("route", route.params);

  return (
    <>
      <MapView
        onPress={(event) => {
          const coordinate = event.nativeEvent.coordinate;
          console.log("marker:", coordinate);
          setSelectedLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          });
        }}
        style={styles.container}
        initialRegion={{
          latitude: route.params
            ? route.params.currentLocation.latitude
            : 37.78825,
          longitude: route.params
            ? route.params.currentLocation.longitude
            : -123.115732,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
      </MapView>

      <Button
        disabled={!selectedLocation}
        title="confirm selected location"
        onPress={() =>
          navigation.navigate("Profile", {
            selectedLocation: selectedLocation,
          })
        }
      />
    </>
  );
};

export default MapScreen;
