import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo, FontAwesome, Foundation } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import { auth } from "../Firebase/firebase-setup";
import LoginScreen from "../screens/LoginScreen";
import { onAuthStateChanged } from "firebase/auth";

export default function BottomTabNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();

  const [isAuthenticated, setIsAuthenticated] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  function iconPressed() {
    navigation.navigate("Login");
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <View style={{ paddingRight: 10 }}>
            <TouchableOpacity
              onPress={iconPressed}
              style={{
                paddingRight: 10,
                opacity: 0.8,
              }}
            >
              <MaterialIcons name="add" size={25} color="white" />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 16,
        },
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "blue",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 5,
        },
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="CryptoMarket"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size ? 30 : 25} color={color} />
          ),
        }}
      />
      {isAuthenticated ? (
        <>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Portfolio"
            component={PortfolioScreen}
            options={{
              tabBarLabel: "Portfolio",
              tabBarIcon: ({ color, size }) => (
                <Foundation
                  name="graph-pie"
                  size={size ? 35 : 30}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Activity List"
            component={ActivitiesScreen}
            options={{
              tabBarLabel: "Activities",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="list" color={color} size={size} />
              ),
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
