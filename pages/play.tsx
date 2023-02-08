import React, { useContext, useState, useEffect, useReducer, useMemo } from "react"
import { PlayersContext } from "../context/PlayersContext"
import PlayerCard from "../components/Card"
import Filter from "../components/Filter"
import styles from "../styles/Draftboard.module.css"
import { getPlayers } from "../utils/Firebase"
import { IdraftPlayer, IdraftStruct } from "../interfaces/Interfaces"

type GameProps = {
    players : Array<object>
}

var pick = true

const Play = ({ players }: GameProps) => {
    const { playerList, setPlayerList } = useContext(PlayersContext)
    const allQbs = playerList.filter(p => p.position === "QB")
    const allRbs = playerList.filter(p => p.position === "RB")
    const allWrs = playerList.filter(p => p.position === "WR")
    const [draftInProgress, setDraftProgress] = useState(false)
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [pr, setPr] = useState(true)
    const [teamDraft, draftPlayer] = useState({
        QB: [],
        RB: [],
        WR: [],
        finalized : false
    })
    const [opponentDraft, draftOpp] = useState({
        positions : [
            { position : "QB" , players : [] },
            { position : "RB" , players : [] },
            { position : "WR" , players : [] },
        ],
        finalized : false
    })
    const filterOpts = [
        { id : "all", title : "ALL"},
        { id : "qb", title : "QB"},
        { id : "rb", title : "RB"},
        { id : "wr", title : "WR"},
        { id : "team", title : "My Team"},
        { id : "opponent", title : "Opponent's Team"},
    ]
    const filterPlayers = (pos: string, key?: string) => {
        switch(key) {
            case "all":
                setFilteredPlayers(playerList)
            break;
            case "qb":
                setFilteredPlayers(playerList.filter(player => player.position === "QB"))
            break;
            case "rb":
                setFilteredPlayers(playerList.filter(player => player.position === "RB"))
            break;
            case "wr":
                setFilteredPlayers(playerList.filter(player => player.position === "WR"))
            break;
        }
    }
    useEffect(() => {
        if (pr) return
        let pos: string = opponentDraft.positions[Math.floor(Math.random() * opponentDraft.positions.length)].position
        if (pos === "QB" && opponentDraft.positions[0].players.length < 4) {
            console.log("qbee")
            let avail = playerList.filter(p => p.position === "QB" && p.drafted === false)
            let pick = avail[Math.floor(Math.random() * avail.length)]
            console.log(pick)
            draftOpp(currentDraft => {
                console.log("c ", currentDraft)
                let c = { ...currentDraft }
                c.positions[0].players.push(pick)
                return c
            })
        } else if (pos === "RB" && opponentDraft.positions[1].players.length < 3) {
            console.log("rbee")
            let avail = playerList.filter(p => p.position === "RB" && p.drafted === false)
            let pick = avail[Math.floor(Math.random() * avail.length)]
            console.log(pick)
            draftOpp(currentDraft => {
                let c = { ...currentDraft }
                c.positions[1].players.push(pick)
                return c
            })
        } else if (pos === "WR" && opponentDraft.positions[2].players.length < 2) {
            console.log("wree")
            let avail = playerList.filter(p => p.position === "WR" && p.drafted === false)
            let pick = avail[Math.floor(Math.random() * avail.length)]
            console.log(pick)
            draftOpp(currentDraft => {
                let c = { ...currentDraft }
                c.positions[2].players.push(pick)
                return c
            })
        }
    }, [teamDraft])
    // const draftOpp = ({ opponentDraft }: IdraftStruct) => {
    //     let pos:string = opponentDraft.positions[Math.floor(Math.random() * opponentDraft.positions.length)].position;
    // }
    const draft = (data: IdraftPlayer) => {
        if (data.drafted === true) return
        let position = data.position
        draftPlayer(currentDraft => {
            if (currentDraft["QB"].length === 4 && currentDraft["RB"].length === 3 && currentDraft["WR"].length === 2) return
            switch(position) {
                case "QB":
                    if (currentDraft.QB.length < 4) {
                        data.drafted = true;
                        return { ...currentDraft, QB : [...currentDraft["QB"], data] }
                    } else return currentDraft
                break;
                case "RB": 
                    if (currentDraft.RB.length < 3) {
                        data.drafted = true;
                        return { ...currentDraft, RB: [...currentDraft["RB"], data] }
                    } else return currentDraft
                break;
                case "WR":
                    if (currentDraft.WR.length < 2) {
                        data.drafted = true;
                        return { ...currentDraft, WR: [...currentDraft["WR"], data] }
                    } else return currentDraft
                break;
                default:
                    return currentDraft
                break;
            }
        })
        setPr(false)
    }
    useEffect(() => {
        if (playerList.length < 1 && draftInProgress === true) {
            const f = async () => {
                const l = await getPlayers()
                if (l.length > 0) {
                    setPlayerList(l)
                }
            }
            f()
        }
    }, [draftInProgress])
    return (
        <div className={styles.draftboard}>
            {draftInProgress === false && (
                <button onClick={() => setDraftProgress(true)}>Start Draft</button>
            )}
            
            {draftInProgress === true && (
                <div className={styles.cont}>
                    <div className={styles.filterCont}>
                        <Filter items={filterOpts} func={filterPlayers}></Filter>
                    </div>
                    {filteredPlayers.length > 0 && (
                        <div className={styles.grid}>
                            {filteredPlayers.map(player => (
                                <PlayerCard key={player.player_id} data={player} showDraft={true} cb={draft}></PlayerCard>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Play