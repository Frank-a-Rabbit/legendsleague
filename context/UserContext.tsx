import React, { createContext, useState, useEffect } from "react"
import { auth, firebase } from "../utils/Firebase"

type Props = {
    children : React.ReactNode
}

export type User = {
    user: firebase.User | null
    uid: string;
    photoURL?: string | null;
}
  
export type UserContextType = {
    currentUser: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserContextProvider = ({ children }: Props) => {
    const [currentUser, setUser] = useState<User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user && Object.keys(user).length) {
                setUser({ user, uid: user.uid, photoURL: user.photoURL });
            } else {
                setUser(null);
            }
        });
    }, []);

    const updateUser = (user: User | ((prevState: User | null) => User | null)) => {
        setUser((prevUser: User | null) => {
        if (typeof user === 'function') {
            return user(prevUser);
        }
        return user;
        });
    };

    const userCtx: UserContextType = {
        currentUser,
        setUser: updateUser as React.Dispatch<React.SetStateAction<User | null>>,
    };

    return (
        <UserContext.Provider value={userCtx}>
        {children}
        </UserContext.Provider>
    )
}