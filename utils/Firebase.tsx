import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: 'legends-league-a7809.firebaseapp.com',
    databaseURL: process.env.FIREBASE_DBURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_SENDERID,
    appId: process.env.FIREBASE_APPID
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