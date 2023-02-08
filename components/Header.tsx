import React, { useContext, useState } from "react"
import { firebase } from "../utils/Firebase"
import { UserContext, userCtx } from "../context/UserContext"
import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Header.module.css"
import { PageContext } from "../context/PageContext"

const Header = () => {
    const { currentUser, setUser } = useContext(UserContext) as userCtx
    const { navItem } = useContext(PageContext)
    const [menuState, setMenuState] = useState(false)
    const logout = () => {
        firebase.auth().signOut()
        setUser(undefined)
    }
    const toggleMenu = () => {
        setMenuState(!menuState)
    }
    const menuText = menuState === false ? "MENU" : "X"
    const links = ["home", "about", "players", "play"]
    const linkItems = links.map(link => {
        let href: string = link === "home" ? "/" : "/"+link
        return <Link key={link} href={href}>{link.toUpperCase()}</Link>
    })
    return (
        <header className={styles.primaryHeader}>
            <div>
                {currentUser && (
                    <div className={styles.avatarCont}>
                        <Image className={styles.avatar} src={currentUser.photoURL} alt="avatar" width={50} height={50}></Image>
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
                {!currentUser && navItem !== "login" && (
                    <Link href="/login">Signup/Login</Link>
                )}
            </div>
            <div className={menuState === true ? styles.close : styles.open}>
                <button onClick={() => toggleMenu()} type="button">{menuText}</button>
                <div>
                    {linkItems}
                </div>
            </div>
        </header>
    )
}

export default Header