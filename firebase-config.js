 // Import the functions you need from the SDKs you need
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyB6Ghu0aRZRENoaaXWxzwBe_VtUg4d7xD4",
   authDomain: "employee-app-d9ea2.firebaseapp.com",
   projectId: "employee-app-d9ea2",
   storageBucket: "employee-app-d9ea2.appspot.com",
   messagingSenderId: "367695352105",
   appId: "1:367695352105:web:1167305c1db2053a4a2738",
   measurementId: "G-6L8KD1MXGZ"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
module.exports = getStorage(app);

//  module.exports = firebaseConfig;