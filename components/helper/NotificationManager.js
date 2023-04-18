import { View, Button, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export async function verifyPermission() {
  const permissionResponse = await Notifications.getPermissionsAsync();
  if (permissionResponse.granted) {
    return true;
  }
  const permissionResult = await Notifications.requestPermissionsAsync();
  // // this will be user's choice:
  return permissionResult.granted;
}

export async function scheduleNotificationHandler(action, amount, coinId) {
  const hasPermission = await verifyPermission();
  if (!hasPermission) {
    Alert.alert("You need to give notification permission");
    return;
  }
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "NOTIFICATION",
        body: "You just " + action + " " + amount + " " + coinId,
      },
      trigger: { seconds: 3 },
    });
  } catch (err) {
    console.log("schedule notification ", err);
  }
}
