import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBi2K3UIRHny7g0MMkfoszMba3paJVIuPc",
  authDomain: "codeblurb-492f1.firebaseapp.com",
  projectId: "codeblurb-492f1",
  storageBucket: "codeblurb-492f1.appspot.com",
  messagingSenderId: "757505501074",
  appId: "1:757505501074:web:f137d29bda6858a3c5434b",
  measurementId: "G-VF4BQE8NHL",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
analytics.app;
