import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2ucwOzckvNNen3QvaqIJRM_sdS6edcIU",
  authDomain: "agon-c176b.firebaseapp.com",
  projectId: "agon-c176b",
  storageBucket: "agon-c176b.appspot.com",
  messagingSenderId: "1024799582965",
  appId: "1:1024799582965:web:d84cc66f96ef25abb733bc"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);
export const db = getFirestore(app);

