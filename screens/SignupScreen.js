// import { View, Text, TextInput, Button, Alert } from "react-native";
// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../Firebase/firebase-setup";
// import { createProfile } from "../Firebase/firebaseHelper";

// const SignupScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confrimPassword, setConfirmPassword] = useState("");

//   const loginHandler = () => {
//     navigation.navigate("Login");
//   };

//   const signupHandler = async () => {
//     if (password != confrimPassword) {
//       Alert.alert("Passwords doesn't match!");
//       return;
//     }
//     try {
//       const userCred = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const newUser = userCred.user;

//       let newProfile = {
//         uid: newUser.uid,
//         email: newUser.email,
//         bio: "Please write about yourself",
//         username: "New User",
//         date: new Date(),
//       };
//       await createProfile(newProfile);

//       navigation.navigate("HomeNavigator");
//       console.log(`user ${email} created!`);
//     } catch (err) {
//       console.log("Auth error", err);
//     }
//   };

//   return (
//     <View>
//       <Text>Email</Text>
//       <TextInput
//         value={email}
//         onChangeText={(newEmail) => {
//           setEmail(newEmail);
//         }}
//         placeholder="Email"
//       />
//       <Text>Password</Text>
//       <TextInput
//         value={password}
//         onChangeText={(newPassword) => {
//           setPassword(newPassword);
//         }}
//         placeholder="Password"
//         secureTextEntry={true}
//       />
//       <Text>Confrim Password</Text>
//       <TextInput
//         value={confrimPassword}
//         onChangeText={(newConfirmPwd) => {
//           setConfirmPassword(newConfirmPwd);
//         }}
//         placeholder="Confrim Password"
//         secureTextEntry={true}
//       />
//       <Button title="Register" onPress={signupHandler} />
//       <Button title="Already Registered? Login" onPress={loginHandler} />
//     </View>
//   );
// };

// export default SignupScreen;
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebase-setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../styles/Color";

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
      console.log(userCred);
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
