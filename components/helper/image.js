import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/firebase-setup";

const fetchImageData = async (uri) => {
  // console.log("local:", uri); //local uri on the device
  const response = await fetch(uri);
  const imageBlob = await response.blob(); //image data
  const imageName = uri.substring(uri.lastIndexOf("/") + 1);
  const imageRef = ref(storage, `images/${imageName}`);
  const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
  return uploadResult.metadata.fullPath; //path to the image on the storage
};

export { fetchImageData };
