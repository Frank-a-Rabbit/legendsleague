import React, { createContext, useState } from "react"

type PlayersContextProps = {
    children : React.ReactNode,
    playerList : Array<object>,
    setPlayerList? : React.Dispatch<React.SetStateAction<any>>
}

export const PlayersContext = createContext({
    playerList : [],
    setPlayerList : (args?: any) => {}
})

const PlayersContextProvider = ({ children }: PlayersContextProps) => {
    const [playerList, setPlayerList] = useState([])
    return (
        <PlayersContext.Provider value={{playerList, setPlayerList}}>
            {children}
        </PlayersContext.Provider>
    )
}

export default PlayersContextProvider