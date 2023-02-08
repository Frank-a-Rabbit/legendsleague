import React, { useState, useContext, useEffect } from "react"
import { getPlayers } from "../utils/Firebase"
import PlayerCard from "../components/Card"
import Filter from "../components/Filter"
import styles from "../styles/PlayerCard.module.css"
import { PlayersContext } from "../context/PlayersContext"

interface Player {
    player_id : number,
    position : string
}

type Props = {
    players : Array<Player>,
    player : Player
}

const Players = ({ players } : Props) => {
    const [currentPlayers, setCurrentPlayers] = useState(players)
    const {setPlayerList} = useContext(PlayersContext)
    useEffect(() => {
        setPlayerList(players)
    }, [])
    const filterByPosition = (position: string) => {
        let selectedPlayers = position === "all" ? players : players.filter(player => player.position === position)
        setCurrentPlayers(selectedPlayers)
    }
    const positions: Array<object> = [
        { id : 1, title : "all" },
        { id : 2, title : "QB" },
        { id : 3, title : "RB" },
        { id : 4, title : "WR" }
    ]
    return (
        <div>
            <div className={styles.controls}>
                <Filter items={positions} func={filterByPosition}></Filter>
            </div>
            <div className={styles.playerGrid}>
                {currentPlayers.map(player => (
                    <PlayerCard key={player.player_id} data={player}></PlayerCard>
                ))}
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const temp: Array<Object> = []
    const players = await getPlayers(temp)
    return {
        props : {
            players
        }
    }
}

export default Players