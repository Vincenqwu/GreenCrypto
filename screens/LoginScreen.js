import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ProfileButton } from "../components/Profile";
import styles from "../styles/loginStyles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const loginHandler = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
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
      <View>
        <Text style={styles.label}>Password</Text>
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
      {showError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>Invalid email or password.</Text>
        </View>
      )}
      <View style={styles.footer}>
        <ProfileButton handler={loginHandler} title="Login" />
        <ProfileButton handler={signupHandler} title="New User Sign Up" />
      </View>
    </View>
  );
}
