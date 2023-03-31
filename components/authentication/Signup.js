import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../Firebase/firebase-setup";

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.navigate("Login");
  };

  const signupHandler = async () => {
    if (password != confrimPassword) {
      Alert.alert("Passwords doesn't match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(`user ${email} created!`);
    } catch (err) {
      console.log("Auth error", err);
    }
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
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Text>Confrim Password</Text>
      <TextInput
        value={confrimPassword}
        onChangeText={(newConfirmPwd) => {
          setConfirmPassword(newConfirmPwd);
        }}
        placeholder="Confrim Password"
        secureTextEntry={true}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
};

export default Signup;
