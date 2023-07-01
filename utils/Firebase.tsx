import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "legends-league-a7809.firebaseapp.com",
    databaseURL: "https://legends-league-a7809.firebaseio.com",
    projectId: "legends-league-a7809",
    storageBucket: "legends-league-a7809.appspot.com",
    messagingSenderId: "281052354601",
    appId: "1:281052354601:web:729b58576cb3556f542438"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    console.log("no")
}

const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider()
const signInWithPopup = firebase.auth().signInWithPopup
const databaseConnection = firebase.firestore();
const auth = firebase.auth();

const getPlayers = async (players = []) => {
    // const players: Array<Object> = []
    const queryResults = await databaseConnection.collection("legends").get()
    queryResults.forEach(legend => {
        players.push(legend.data())
    })
    return players
}

export { databaseConnection, auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, firebase, getPlayers }