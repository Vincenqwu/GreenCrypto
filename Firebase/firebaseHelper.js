import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";
import { auth } from "./firebase-setup";

export async function createActivity(activity) {
  try {
    const docRef = await addDoc(collection(firestore, "activities"), {
      ...activity,
      userId: auth.currentUser.uid,
    });
    console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function editActivity(activityId, postCreated) {
  try {
    await updateDoc(doc(firestore, "activities", activityId), postCreated);
  } catch (err) {
    console.log(err);
  }
}

export async function createPost(post) {
  try {
    const docRef = await addDoc(collection(firestore, "posts"), post);
    console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deletePost(postId) {
  try {
    await deleteDoc(doc(firestore, "posts", postId));
  } catch (err) {
    console.log(err);
  }
}

export async function createProfile(profile) {
  try {
    const docRef = await addDoc(collection(firestore, "profiles"), profile);
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserProfile(pid, newProfile) {
  try {
    const profileRef = doc(firestore, "profiles", pid);
    await updateDoc(profileRef, newProfile);
  } catch (err) {
    console.log(err);
  }
}
