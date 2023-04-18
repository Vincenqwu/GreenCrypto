import { View, TouchableOpacity, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, Foundation, Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import { auth } from "../Firebase/firebase-setup";
import LoginScreen from "../screens/LoginScreen";
import { onAuthStateChanged } from "firebase/auth";
import { Colors } from "../styles/Color";


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
    console.log("icon pressed");
    navigation.navigate("Search");
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
              <Ionicons name="search-sharp" size={26} color="white" />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: Colors.barColor,
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 16,
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 70, 
          paddingHorizontal: 5,
          backgroundColor: Colors.barColor,
          position: "absolute",
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10, // adjust for safe area insets on iOS
         
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: Platform.OS === 'ios' ? 5 : 0, 
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
