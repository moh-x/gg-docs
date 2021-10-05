import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCIhOGlEIKCo6LKz4g0nJEBM9rGlUTubOQ",
	authDomain: "gg-docs.firebaseapp.com",
	projectId: "gg-docs",
	storageBucket: "gg-docs.appspot.com",
	messagingSenderId: "554514628736",
	appId: "1:554514628736:web:7085a6be2e132bf4322665",
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = app.firestore();

export { db };
