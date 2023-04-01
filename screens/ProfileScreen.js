import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import Profile from "../components/Profile";
import styles from "../components/styles/styles";

export default function ProfileScreen() {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [bio, setBio] = useState("This is my bio");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Code to save changes to username and bio
  };

  const onLogout = () => {};

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
          <Text style={styles.username}>{username}</Text>
          {/* <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity> */}
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
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.button}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.button}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
