import React, { useState, useEffect, useContext } from "react"
import { UserContext, userCtx } from "../context/UserContext"
import { firebase, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "../utils/Firebase"
import { databaseConnection } from "../utils/Firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "../styles/Nav.module.css"
import { useRouter } from "next/router"

const userToDB = (user) => {

}

type loginProps = {
    navItem : string
}

const Login = ({ navItem }) => {
    const { currentUser, setUser } = useContext(UserContext) as userCtx
    const router = useRouter()
    const siginWithProvider = (provider : any) => {
        switch(provider) {
            case "go":
                let service = GoogleAuthProvider
                firebase.auth().signInWithPopup(service).then(result => {
                    console.log("Result ", result)
                    databaseConnection.collection("users").doc(result.user.uid).get().then(doc => {
                        if (doc.exists) {
                            setUser(result.user)
                            router.push("/")
                        } else {
                            console.log("npt ", result)
                            databaseConnection.collection("users").doc(result.user.uid).set({
                                email : result.user.email,
                                name : result.user.displayName,
                                photo : result.user.photoURL,
                                wins : 0,
                                losses : 0
                            }).then(() => {
                                setUser(result.user)
                                router.push("/")
                            })
                        }
                    })
                })
            break
        }
    }
    return (
        <section>
            <nav className={styles.navCont}>
                <ul>
                    <li onClick={() => siginWithProvider("fb")}>Facebook</li>
                    <li onClick={() => siginWithProvider("go")}><FontAwesomeIcon icon="fa-brands fa-google" />Google</li>
                    <li>GitHub</li>
                </ul>
            </nav>
        </section>
    )
}

export async function getStaticProps() {
    return {
        props : {
            navItem : "login"
        }
    }
}

export default Login