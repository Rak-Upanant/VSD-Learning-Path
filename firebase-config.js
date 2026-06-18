// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyDmDvSOwdiEF0ZN5QWYpardsJZntdDVsNo",
  authDomain: "vsd-maintenace-progressing.firebaseapp.com",
  databaseURL: "https://vsd-maintenace-progressing-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vsd-maintenace-progressing",
  storageBucket: "vsd-maintenace-progressing.appspot.com",
  messagingSenderId: "1070321938533",
  appId: "1:1070321938533:web:92707b3bfff8c8f64bd68c",
  measurementId: "G-HL45FSZLY2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
