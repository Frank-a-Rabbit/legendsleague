import React, { createContext, useState, useEffect } from "react"
import { auth } from "../utils/Firebase"

type Props = {
    children : React.ReactNode
}

export type userCtx = {
    currentUser : any,
    setUser : React.Dispatch<React.SetStateAction<any>>
}

export const UserContext = createContext({})

export const UserContextProvider = ({ children } : Props) => {
    const [currentUser, setUser] = useState(undefined)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user && Object.keys(user).length) {
                setUser(user)
            }
        })
    }, [])

    const userCtx : userCtx = {
        currentUser,
        setUser
    }

    return (
        <UserContext.Provider value={userCtx}>
            { children }
        </UserContext.Provider>
    )
}