import React, { useContext, useState, useEffect } from "react"
import { firebase } from "../utils/Firebase"
import { UserContext, userCtx } from "../context/UserContext"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Header.module.css"
import { PageContext } from "../context/PageContext"
import { useDataWatcher } from "../context/DataWatcherContext"

const Header = () => {
    const { pushToDataLayer, createEvent } = useDataWatcher()
    const { currentUser, setUser } = useContext(UserContext)
    const { navItem } = useContext(PageContext)
    const [menuState, setMenuState] = useState(false)
    const [addClass, setAddClass] = useState('')
    const logout = () => {
        firebase.auth().signOut()
        setUser(undefined)
    }
    const toggleMenu = () => {
        console.log('toggle menu')
        setMenuState(!menuState)
    }
    const menuText = menuState === false ? "MENU" : "X"
    const links = ["home", "about", "players"]
    if (currentUser !== null) links.push("play")
    const linkItems = links.map(link => {
        let href: string = link === "home" ? "/" : "/"+link
        return <Link key={link} href={href} onClick={() => pushToDataLayer(createEvent({event : 'ga4_ffh_link_click', action : 'link_click', category : undefined, ffh_label : link, value : undefined}))}>{link.toUpperCase()}</Link>
    })
    const router = useRouter()
    useEffect(() => {
        setAddClass(styles.active)
        const routeChangeComplete = () => {
            setMenuState(false)
        }
        router.events.on("routeChangeComplete", routeChangeComplete)
        return () => {
            router.events.off("routeChangeComplete", routeChangeComplete)
        }
    }, [])
    return (
        <header className={`${styles.primaryHeader} ${addClass}`}>
            <div className={styles.avatarCont}>
                {currentUser && (
                    <div className={styles.avatarCont}>
                        <Image className={styles.avatar} src={currentUser.photoURL} alt="avatar" width={50} height={50}></Image>
                        <button className={styles.logout} onClick={logout}>Logout</button>
                    </div>
                )}
                {!currentUser && navItem !== "login" && (
                    <Link href="/login">Signup/Login</Link>
                )}
            </div>
            <div className={`linkCont ${menuState ? styles.close : styles.open}`}>
                <button onClick={() => toggleMenu()} type="button">{menuText}</button>
                <div>
                    {linkItems}
                </div>
            </div>
            <div className={styles.accent}></div>
            <h1 className={styles.primaryHeading}>Fantasy Football Heros</h1>
        </header>
    )
}

export default Header