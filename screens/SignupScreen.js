import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../styles/Color";
import { createProfile } from "../Firebase/firebaseHelper";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const signupHandler = async () => {
    if (password !== confirmPassword) {
      setShowError(true);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred.user.uid);
      const user = userCred.user;
      await createProfile(user);
      navigation.navigate("HomeNavigator", { screen: "Profile" });
    } catch (err) {
      console.log("signup err ", err);
      setShowError(true);
    }
  };

  const loginHandler = () => {
    navigation.navigate("Login");
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
      <Text>Confirm Password</Text>
      <TextInput
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(newConfirmPassword) => {
          setConfirmPassword(newConfirmPassword);
        }}
        placeholder="Confirm Password"
        style={styles.input}
      />
      {showError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>
            {password !== confirmPassword
              ? "Passwords do not match"
              : "Error creating account"}
          </Text>
        </View>
      )}
      <Button title="Create Account" onPress={signupHandler} />
      <Button title="Already have an account? Login" onPress={loginHandler} />
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
