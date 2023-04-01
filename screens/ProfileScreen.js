import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styles/profileStyles";
import PressableButton from "../components/PressableButton";
import { AntDesign } from "@expo/vector-icons";
import { auth, firestore } from "../Firebase/firebase-setup";
import { signOut } from "firebase/auth";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { updateUserProfile } from "../Firebase/firebaseHelper";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [profileId, setProfileId] = useState(null);

  const onCancel = () => {
    setIsEditing(false);
  };

  const currentUser = auth.currentUser;
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "profiles"),
        where("uid", "==", currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          // no data
          let newProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            bio: "Please write about yourself",
            username: "New User",
          };
          setProfile(newProfile);
        } else {
          let newProfile = null;
          let snap = querySnapshot.docs.at(0);

          newProfile = snap.data();
          setProfile(newProfile);
          setProfileId(snap.id);
        }
      },
      (error) => {
        console.log("onsnapshot error: ", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const handleSave = () => {
    setIsEditing(false);
    setEditBio(editBio);
    setEditUsername(editUsername);

    let newProfile = {
      ...profile,
      username: editUsername,
      bio: editBio,
    };
    // console.log(newProfile);
    if (profileId) {
      updateUserProfile(profileId, newProfile);
    }
  };

  const onLogout = () => {
    signOut(auth);
  };
  const onEdit = () => {
    setIsEditing(true);
    if (profile) {
      setEditBio(profile.bio);
      setEditUsername(profile.username);
    }
  };

  if (!profile) {
    return <Text>Loading...</Text>;
  }

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
          <Text style={styles.username}>{profile.username}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>
          {isEditing ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                  style={styles.input}
                  value={editUsername}
                  onChangeText={(newUsername) => {
                    setEditUsername(newUsername);
                  }}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Bio:</Text>
                <TextInput
                  style={styles.input}
                  value={editBio}
                  onChangeText={(newBio) => {
                    setEditBio(newBio);
                  }}
                  multiline={true}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{profile.username}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.value}>{profile.bio} </Text>
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
            <PressableButton style={styles.button} pressHandler={onCancel}>
              <Text style={styles.btnText}>Cancel</Text>
            </PressableButton>
          </>
        ) : (
          <>
            <PressableButton style={styles.button} pressHandler={onEdit}>
              <Text style={styles.btnText}>Edit</Text>
            </PressableButton>
            <PressableButton style={styles.button} pressHandler={onLogout}>
              <Text style={styles.btnText}>Log out</Text>
            </PressableButton>
          </>
        )}
      </View>
    </View>
  );
}
