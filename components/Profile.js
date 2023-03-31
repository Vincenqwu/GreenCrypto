import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "./styles/styles";

const Profile = () => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [bio, setBio] = useState("This is my bio");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Code to save changes to username and bio
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={styles.userIcon}
        />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
        {isEditing ? (
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
        ) : (
          <>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{username}</Text>
            <Text style={styles.label}>Bio:</Text>
            <Text style={styles.value}>{bio}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Profile;
