import { collection, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
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

export async function deletePost(postId) {
  try {
    await deleteDoc(doc(firestore, "posts", postId));
  } catch (err) {
    console.log(err);
  }
}