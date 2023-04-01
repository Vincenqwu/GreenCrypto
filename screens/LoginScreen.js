import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCred);
      navigation.navigate("HomeNavigator", { screen: "Profile" });
    } catch (err) {
      console.log("login err ", err);
    }
  };
  const signupHandler = () => {
    navigation.replace("Signup");
  };
  return (
    <View>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="Email"
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
        placeholder="Password"
      />
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create an Account" onPress={signupHandler} />
    </View>
  );
}
