import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styles/profileStyles";
import { auth, firestore } from "../Firebase/firebase-setup";
import { signOut } from "firebase/auth";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { updateUserProfile } from "../Firebase/firebaseHelper";
import {
  ProfileButton,
  ProfileField,
  StaticProfileField,
} from "../components/Profile";
import ImageManager from "../components/ImageManager";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";
import LocateOptions, { StaticMap } from "../components/LocateOptions";
import { fetchImageData } from "../components/helper/image";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [location, setLocation] = useState(""); // address string. eg. San Francisco, CA
  const [coordinate, setCoordinate] = useState(null);

  // Icon Image Manager
  const defaultImgUri = "https://reactnative.dev/img/tiny_logo.png";
  const [imageUri, setImageUri] = useState(defaultImgUri);
  const [hasNewPhoto, setHasNewPhoto] = useState(false);

  const imageUriHandler = (uri) => {
    setImageUri(uri);
    console.log("set image uri: ", uri);
    setHasNewPhoto(true);
  };

  const onCancel = () => {
    setIsEditing(false);
    setHasNewPhoto(false);
  };

  console.log("profile: ", profile);

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
            iconUri: defaultImgUri,
            location: location,
            coordinate: coordinate,
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

  const handleSave = async (uri) => {
    setIsEditing(false);
    setEditBio(editBio);
    setEditUsername(editUsername);

    let newProfile = {
      ...profile,
      username: editUsername,
      bio: editBio,
      location: location,
      coordinate: coordinate,
    };
    if (profileId) {
      if (hasNewPhoto) {
        let newIconUri = await fetchImageData(uri);
        const reference = ref(storage, newIconUri);
        const url = await getDownloadURL(reference);
        // console.log("download url:", url);

        newProfile = {
          ...newProfile,
          iconUri: url,
        };
      }
      if (location !== "") {
        newProfile = {
          ...newProfile,
          location: location,
        };
      }
      if (coordinate !== {}) {
        newProfile = {
          ...newProfile,
          coordinate: coordinate,
        };
      }
      console.log("saving profile:", newProfile);

      updateUserProfile(profileId, newProfile);
    }
  };

  const getIconImage = () => {
    if (hasNewPhoto) {
      return imageUri;
    }
    return profile.iconUri || defaultImgUri;
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

  if (!profile) return <Text>Loading...</Text>;

  return (
    <View style={styles.profileContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: getIconImage() }} style={styles.userIcon} />
          <Text style={styles.username}>{profile.username}</Text>
          {isEditing && <ImageManager imageUriHandler={imageUriHandler} />}
        </View>
        <View style={styles.body}>
          <ProfileField label={"Email"} value={profile.email} />
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
              <LocateOptions
                setCoordinate={setCoordinate}
                profile={profile}
                setLocation={setLocation}
              />
              {coordinate && <StaticMap location={coordinate} />}
            </>
          ) : (
            <StaticProfileField profile={profile} />
          )}
        </View>
      </View>
      <View style={styles.footer}>
        {isEditing ? (
          <>
            <ProfileButton
              handler={() => {
                handleSave(imageUri);
              }}
              title="Save"
            />
            <ProfileButton handler={onCancel} title="Cancel" />
          </>
        ) : (
          <>
            <ProfileButton handler={onEdit} title="Edit" />
            <ProfileButton handler={onLogout} title="Log out" />
          </>
        )}
      </View>
    </View>
  );
}
