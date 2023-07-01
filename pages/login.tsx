import React, { useContext } from "react"
import { User, UserContext } from "../context/UserContext"
import { firebase, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "../utils/Firebase"
import { databaseConnection } from "../utils/Firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"
import styles from "../styles/Nav.module.css"
import { useRouter } from "next/router"

const Login = () => {
    const { currentUser, setUser } = useContext(UserContext)
    const router = useRouter()
    const siginWithProvider = (provider : any) => {
        switch(provider) {
            case "go":
                let googleService = GoogleAuthProvider
                firebase.auth().signInWithPopup(googleService).then((result) => {
                    if (result.user) {
                        const { user, uid, photoURL } = result.user
                        const userData: User = {
                            user,
                            uid,
                            photoURL: photoURL || null,
                        }
                        databaseConnection.collection("users").doc(result.user.uid).get().then(doc => {
                            if (doc.exists) {
                                setUser(userData)
                                router.push("/play")
                            } else {
                                databaseConnection.collection("users").doc(userData.uid).set({
                                    email : userData.user?.email,
                                    name : userData.user?.displayName,
                                    photo : userData.photoURL,
                                    wins : 0,
                                    losses : 0
                                }).then(() => {
                                    setUser(userData)
                                    router.push("/play")
                                })
                            }
                        })
                    }
                })
            break
            case "fb":
                let fbService = FacebookAuthProvider
                firebase.auth().signInWithPopup(fbService).then(result => {
                    if (result.user) {
                        const { user, uid, photoURL } = result.user
                        const userData: User = {
                            user,
                            uid,
                            photoURL: photoURL || null,
                        }
                        databaseConnection.collection("users").doc(userData.uid).get().then(doc => {
                            if (doc.exists) {
                                setUser(userData)
                                router.push("/play")
                            } else {
                                databaseConnection.collection("users").doc(userData.uid).set({
                                    email : userData.user?.email,
                                    name : userData.user?.displayName,
                                    photo : userData.photoURL,
                                    wins : 0,
                                    losses : 0
                                }).then(() => {
                                    setUser(userData)
                                    router.push("/play")
                                })
                            }
                        })
                    }
                })
            break
        }
    }
    return (
        <section className={styles.loginCont}>
            <div className={styles.infoCont}>
                <p>Choose from one of the providers below to create an account or login to an existing account.</p>
            </div>
            <nav className={styles.navCont}>
                <ul>
                    <li onClick={() => siginWithProvider("fb")}><FontAwesomeIcon icon={faFacebook} />Facebook</li>
                    <li onClick={() => siginWithProvider("go")}><FontAwesomeIcon icon={faGoogle} />Google</li>
                </ul>
            </nav>
        </section>
    )
}

export default Login