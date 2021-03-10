import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC1wMHn03HX_DTGH-j333gkeNNq_B0wodg",
  projectId: "locoshop-278515",
  databaseURL: "https://locoshop-278515.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
export const getFirestoreAuth = () => {
  return firebase.auth();
};
