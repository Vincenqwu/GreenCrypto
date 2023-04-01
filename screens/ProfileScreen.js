import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import Profile from "../components/Profile";
import styles from "../components/styles/styles";

export default function ProfileScreen() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [bio, setBio] = useState("This is my bio");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Code to save changes to username and bio
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={styles.userIcon}
        />
        <Text style={styles.username}>{username}</Text>
        {/* <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.body}>
        {/* <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text> */}
        {/* {isEditing ? (
          <>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Bio:</Text>
            <TextInput
              style={styles.input}
              value={bio}
              onChangeText={setBio}
              multiline={true}
            />
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </>
        ) : ( */}
        <>
          <View>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{username}</Text>
          </View>
          <Text style={styles.label}>Bio:</Text>
          <Text style={styles.value}>{bio}</Text>
        </>
        {/* )} */}
      </View>
    </View>
  );
}
