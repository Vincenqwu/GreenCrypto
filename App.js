import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SearchCoinScreen from "./screens/SearchCoinScreen";
import CoinDetailScreen from "./screens/CoinDetailScreen";
import MapScreen from "./screens/MapScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
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
          }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: "Signup",
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchCoinScreen}
          options={{
            title: "Search Coin",
          }}
        />
        <Stack.Screen
          name="Details"
          component={CoinDetailScreen}
          options={{
            title: "Details",
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "Map",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
