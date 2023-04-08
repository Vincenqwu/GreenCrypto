import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "../styles/styles";

const MapScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <MapView
        onPress={(event) => {
          setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
        }}
        style={styles.container}
        initialRegion={{
          latitude: route.params
            ? route.params.currentLocation.latitude
            : 37.78825,
          longitude: route.params
            ? route.params.currentLocation.longitude
            : -122.4324,
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
