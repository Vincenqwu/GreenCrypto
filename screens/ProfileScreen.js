import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import Profile from "../components/Profile";
import styles from "../components/styles/styles";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [bio, setBio] = useState("This is my bio");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    console.log("save new profile");
    // Code to save changes to username and bio
  };

  const onLogout = () => {
    console.log("log out");
  };
  const onEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
            style={styles.userIcon}
          />
          <PressableButton style={styles.camera}>
            <AntDesign name="camera" size={24} color="black" />
          </PressableButton>
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          {isEditing ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Bio:</Text>
                <TextInput
                  style={styles.input}
                  value={bio}
                  onChangeText={setBio}
                  multiline={true}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{username}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.value}>{bio} </Text>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        {isEditing ? (
          <>
            <PressableButton style={styles.button} pressHandler={handleSave}>
              <Text style={styles.btnText}>Save</Text>
            </PressableButton>
          </>
        ) : (
          <PressableButton style={styles.button} pressHandler={onEdit}>
            <Text style={styles.btnText}>Edit</Text>
          </PressableButton>
        )}
        <PressableButton style={styles.button} pressHandler={onLogout}>
          <Text style={styles.btnText}>Log out</Text>
        </PressableButton>
      </View>
    </View>
  );
}
