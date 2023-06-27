import React, { useContext, useState, useEffect } from "react"
import { PlayersContext } from "../context/PlayersContext"
import { UserContext, UserContextType } from "../context/UserContext"
import PlayerCard from "../components/Card"
import Filter from "../components/Filter"
import styles from "../styles/Draftboard.module.css"
import { getPlayers } from "../utils/Firebase"
import { IdraftPlayer, IdraftStruct } from "../interfaces/Interfaces"
import { IteamDraft, IopponentDraft } from "../utils/Interfaces"
import Scoreboard from "../components/Scoreboard"
import { Player } from "../utils/Interfaces"

type GameProps = {
    players : Array<Player>
}

const Play: React.FC<GameProps> = ({ players }) => {
    const [resetState, setResetState] = useState(false)
    const [draftFinalized, setDraftFinalized] = useState(false)
    const { playerList, setPlayerList } = useContext(PlayersContext)
    const currentUser = useContext<UserContextType | null>(UserContext)?.currentUser
    const [draftInProgress, setDraftProgress] = useState(false)
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [ops, setOps] = useState(true)
    const defaultTeamDraft = {
        QB: [],
        RB: [],
        WR: [],
        finalized : false
    }
    const defaultOpponentDraft = {
        positions : [
            { position : "QB" , players : [] },
            { position : "RB" , players : [] },
            { position : "WR" , players : [] },
        ],
        finalized : false
    }
    const [teamDraft, draftPlayer] = useState<IteamDraft>(defaultTeamDraft)
    const [opponentDraft, draftOpp] = useState<IopponentDraft>(defaultOpponentDraft)
    useEffect(() => {
        if (opponentDraft.positions[0].players.length + opponentDraft.positions[1].players.length + opponentDraft.positions[2].players.length === 9) {
            setDraftFinalized(true)
        }
    }, [opponentDraft])
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
            case "team":
                setFilteredPlayers([...teamDraft.QB, ...teamDraft.RB, ...teamDraft.WR])
            break;
            case "opponent":
                setFilteredPlayers([...opponentDraft.positions[0].players, ...opponentDraft.positions[1].players, ...opponentDraft.positions[2].players])
            break;
        }
    }
    const oppDraft = (pos: string) => {
        if (teamDraft.QB.length + teamDraft.RB.length + teamDraft.WR.length === 0) {
            return
        }
        if (pos === "QB" && opponentDraft.positions[0].players.length < 4) {
          let avail = playerList.filter(p => p.position === "QB" && p.drafted === false) as Player[];
          let pick = avail[Math.floor(Math.random() * avail.length)] as Player;
          playerList[playerList.indexOf(pick)].drafted = true;
          draftOpp(currentDraft => {
            let updatedPositions = currentDraft.positions.map(position => {
              if (position.position === "QB") {
                return {
                  ...position,
                  players: [...position.players, { ...pick, drafted: true }],
                };
              }
              return position;
            });
      
            let finalized = updatedPositions.reduce(
              (total, position) => total + position.players.length,
              0
            ) === 9;
      
            return {
              ...currentDraft,
              positions: updatedPositions,
              finalized: finalized,
            };
          });
        } else if (pos === "RB" && opponentDraft.positions[1].players.length < 3) {
          let avail : Player[] = playerList.filter((p : Player) => p.position === "RB" && p.drafted === false);
          console.log("avail", avail)
          let pick : Player = avail[Math.floor(Math.random() * avail.length)];
          playerList[playerList.indexOf(pick)].drafted = true;          
          draftOpp(currentDraft => {
            let updatedPositions = currentDraft.positions.map(position => {
              if (position.position === "RB") {
                return {
                  ...position,
                  players: [...position.players, { ...pick, drafted: true }],
                };
              }
              return position;
            });
      
            let finalized = updatedPositions.reduce(
              (total, position) => total + position.players.length,
              0
            ) === 9;
      
            return {
              ...currentDraft,
              positions: updatedPositions,
              finalized: finalized,
            };
          });
        } else if (pos === "WR" && opponentDraft.positions[2].players.length < 2) {
          let avail = playerList.filter(p => p.position === "WR" && p.drafted === false);
          let pick = avail[Math.floor(Math.random() * avail.length)] as Player;
          playerList[playerList.indexOf(pick)].drafted = true;
          draftOpp(currentDraft => {
            let updatedPositions = currentDraft.positions.map(position => {
              if (position.position === "WR") {
                return {
                  ...position,
                  players: [...position.players, { ...pick, drafted: true }],
                };
              }
              return position;
            });
      
            let finalized = updatedPositions.reduce(
              (total, position) => total + position.players.length,
              0
            ) === 9;
      
            return {
              ...currentDraft,
              positions: updatedPositions,
              finalized: finalized,
            };
          });
        }
    };
    useEffect(() => {
        if (ops || opponentDraft.finalized) return
        if (resetState) setResetState(false)
        let pos: string = opponentDraft.positions[Math.floor(Math.random() * opponentDraft.positions.length)].position
        switch(pos) {
            case "QB":
                if (opponentDraft.positions[0].players.length < 4) {
                    oppDraft("QB")
                } else {
                    let r = Math.floor(Math.random() * 2) + 1
                    let nextPos = r === 1 ? "RB" : "WR"
                    if (nextPos === "RB" && opponentDraft.positions[1].players.length === 3) {
                        nextPos = "WR"
                    } else if (nextPos === "WR" && opponentDraft.positions[2].players.length === 2) {
                        nextPos = "RB"
                    }
                    oppDraft(nextPos)
                }
            break
            case "RB":
                if (opponentDraft.positions[1].players.length < 3) {
                    oppDraft("RB")
                } else {
                    let r = Math.floor(Math.random() * 2) * 2 + 1
                    let nextPos = r === 1 ? "QB" : "WR"
                    if (nextPos === "WR" && opponentDraft.positions[2].players.length === 2) {
                        nextPos = "QB"
                    } else if (nextPos === "QB" && opponentDraft.positions[0].players.length === 4) {
                        nextPos = "WR"
                    }
                    oppDraft(nextPos)
                }
            break
            case "WR":
                if (opponentDraft.positions[2].players.length < 2) {
                    oppDraft("WR")
                } else {
                    let r = Math.floor(Math.random() * 2)
                    let nextPos = r === 0 ? "QB" : "RB"
                    if (nextPos === "QB" && opponentDraft.positions[0].players.length === 4) {
                        nextPos = "RB"
                    } else if (nextPos === "RB" && opponentDraft.positions[1].players.length === 3) {
                        nextPos = "QB"
                    }
                    oppDraft(nextPos)
                }
        }
    }, [teamDraft])
    const draft = (data: IdraftPlayer) => {
        if (data.drafted === true) return
        if (teamDraft.QB.length === 4 && teamDraft.RB.length === 3 && teamDraft.WR.length === 2) {
            draftPlayer(currentDraft => {
                return { ...currentDraft, finalized : true }
            })
            draftOpp(currentDraft => {
                return { ...currentDraft, finalized : true }
            })
        }
        let position = data.position
        draftPlayer(currentDraft => {

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
        setOps(false)
    }
    const resetStateCb = () => {
        playerList.forEach(p => {
            if (p.drafted === true) {
                p.drafted = false
            }
        })
        setResetState(true)
        setDraftProgress(false)
        setDraftFinalized(false)
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
    useEffect(() => {
        draftPlayer(currentDraft => {
            return { ...currentDraft, QB : [], RB : [], WR : [], finalized : false }
        })
        draftOpp(currentDraft => ({
            ...currentDraft,
            positions : currentDraft.positions.map(position => ({
                ...position,
                players : []
            })),
            finalized: false
        }))
    }, [resetState])
    return (
        <div>
            {currentUser === null && (
                <div className={styles.prompt}>
                    <h2>Login to Play</h2>
                </div>
            )}
            {currentUser !== null && (
                <div className={styles.draftboard}>
                {draftInProgress === false && (
                    <div className={styles.startCont}>
                        <button className={styles.start} onClick={() => setDraftProgress(true)}>Start Draft</button>
                    </div>
                )}
                
                {draftInProgress === true && draftFinalized === false && (
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
    
                {draftFinalized === true && !resetState && (
                    <Scoreboard teamDraft={teamDraft} opponentDraft={opponentDraft} resetDraft={resetStateCb}></Scoreboard>   
                )}
            </div>
            )}
        </div>
    )
}

export default Play