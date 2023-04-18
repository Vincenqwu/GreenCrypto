import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SearchCoinScreen from "./screens/SearchCoinScreen";
import CoinDetailScreen from "./screens/CoinDetailScreen";
import MapScreen from "./screens/MapScreen";
import { Colors } from "./styles/Color";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeNavigator"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
              headerStyle: { backgroundColor: Colors.barColor },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              title: "Signup",
              headerStyle: { backgroundColor: Colors.barColor },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchCoinScreen}
            options={{
              title: "Search Coin",
              headerStyle: { backgroundColor: Colors.barColor },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="Details"
            component={CoinDetailScreen}
            options={{
              title: "Details",
              headerStyle: { backgroundColor: Colors.barColor },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              title: "Map",
              headerStyle: { backgroundColor: Colors.barColor },
              headerTintColor: "white",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
