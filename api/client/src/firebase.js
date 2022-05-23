// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMHALxOAS_3kx6fE75lTBHaPd7xAVihV0",
  authDomain: "blog-50520.firebaseapp.com",
  projectId: "blog-50520",
  storageBucket: "blog-50520.appspot.com",
  messagingSenderId: "30778540060",
  appId: "1:30778540060:web:91c4849a790b9614b55fd9",
  measurementId: "G-S437X2EJMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;