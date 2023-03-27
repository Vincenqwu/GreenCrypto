import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import ActivityListScreen from '../screens/ActivityListScreen';

export default function BottomTabNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();

  function iconPressed() {
    console.log("icon pressed");
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
              <MaterialIcons
                name="add"
                size={25}
                color="white"
              />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "blue",
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 5,
        },
        tabBarActiveTintColor: "orange",
      }}
  
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="coffee" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity List"
        component={ActivityListScreen}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}