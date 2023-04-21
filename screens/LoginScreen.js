import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../styles/Color";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const loginHandler = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCred);
      navigation.navigate("HomeNavigator", { screen: "Profile" });
    } catch (err) {
      console.log("login err ", err);
      setShowError(true);
    }
  };
  const signupHandler = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="Email"
        style={styles.input}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
        placeholder="Password"
        style={styles.input}
      />
      {showError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>Invalid email or password.</Text>
        </View>
      )}
      <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create an Account" onPress={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },

  error: {
    backgroundColor: Colors.errorColor,
    padding: 10,
    width: "100%",
  },
  errorText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
