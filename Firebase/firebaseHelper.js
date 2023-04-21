import {
  query,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  getDoc,
  where,
  setDoc,
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

export async function createProfile(user) {
  let newProfile = {
    bio: "Please write about yourself",
    email: user.email,
    iconUri: "https://reactnative.dev/img/tiny_logo.png",
    uid: user.uid,
    username: "New User",
  };
  try {
    const docRef = await addDoc(collection(firestore, "profiles"), newProfile);
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

export async function getUserLocation() {
  try {
    const docSnap = await getDoc(doc(firestore, "users", auth.currentUser.uid));

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.log("get user location ", err);
  }
}

export async function saveUserLocation(location) {
  try {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), location);
  } catch (err) {
    console.log("save user location ", err);
  }
}

export async function getUserWatchList(uid) {
  try {
    const q = query(collection(firestore, "profiles"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);
    if (!querySnapshot.empty) {
      const profileDoc = querySnapshot.docs[0];
      const watchList = profileDoc.data().watchList;
      if (watchList) {
        return watchList;
      } else {
        return [];
      }
    }
  } catch (err) {
    console.log("get user watchlist ", err);
    return [];
  }
}

export async function updateWatchList(uid, coinId) {
  // watchList is an array of coin ids
  try {
    const q = query(collection(firestore, "profiles"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const profileDoc = querySnapshot.docs[0];
      const watchList = profileDoc.data().watchList;
      if (watchList && watchList.includes(coinId)) {
        // remove coinId from watchList
        const updatedWatchList = watchList.filter((id) => id !== coinId);
        await updateDoc(profileDoc.ref, { watchList: updatedWatchList });
      } else if (watchList && !watchList.includes(coinId)) {
        // add coinId to watchList
        watchList.push(coinId);
        await updateDoc(profileDoc.ref, { watchList });
      } else {
        // create watchList
        await updateDoc(profileDoc.ref, { watchList: [coinId] });
      }
    }
  } catch (err) {
    console.log("update watchlist ", err);
  }
}

export async function createPortfolio(uid) {
  let newPortfolio = {
    uid: uid,
    fund: 0,
    cash: 0,
    cryptos: [],
  };
  try {
    const docRef = await addDoc(
      collection(firestore, "portfolios"),
      newPortfolio
    );
  } catch (err) {
    console.log("create portfolio error:", err);
  }
}

export async function updatePortfolio(pid, newPortfolio) {
  console.log("newPortfolio", newPortfolio);
  try {
    const portfolioRef = doc(firestore, "portfolios", pid);
    await updateDoc(portfolioRef, newPortfolio);
  } catch (err) {
    console.log(err);
  }
}
