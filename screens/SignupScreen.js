import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../styles/Color";
import { createPortfolio, createProfile } from "../Firebase/firebaseHelper";
import { ProfileButton } from "../components/Profile";
import styles from "../styles/loginStyles";

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
      await createPortfolio(user.uid);
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
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(newEmail) => {
            setEmail(newEmail);
          }}
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <Text style={styles.label}>Password</Text>
      <View>
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={(newPassword) => {
            setPassword(newPassword);
          }}
          placeholder="Password"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Confirm Password</Text>
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
      </View>
      <View style={styles.footer}>
        <ProfileButton handler={signupHandler} title="Sign Up" />
        <ProfileButton handler={loginHandler} title="User Login" />
      </View>
    </View>
  );
}
