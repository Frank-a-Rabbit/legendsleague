import React, { createContext, useState, useEffect } from "react"
import { auth } from "../utils/Firebase"

type Props = {
    children : React.ReactNode
}

export type User = {
    user: any;
    uid: string;
    photoURL?: string | null;
}
  
export type UserContextType = {
    currentUser: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | null>(null)

export type userCtx = {
    currentUser : any,
    setUser : React.Dispatch<React.SetStateAction<any>>
}

export const UserContextProvider = ({ children } : Props) => {
    const [currentUser, setUser] = useState<User | null>(null)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user && Object.keys(user).length) {
                setUser({ user, uid: user.uid, photoURL: user.photoURL })
            } else {
                setUser(null)
            }
        })
    }, [])

    const userCtx : userCtx = {
        currentUser,
        setUser: (user) => {
            if (user !== null) {
                if (user === undefined) return
                setUser({ user, uid: user.uid, photoURL: user.photoURL })
            } else if (user === undefined) {
              setUser(null)
            }
          }
    }

    return (
        <UserContext.Provider value={userCtx}>
            { children }
        </UserContext.Provider>
    )
}