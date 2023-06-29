import React, { useState } from "react"
import { Button } from "./Filter"
import styles from "../styles/PlayerCard.module.css"

interface playerData {
    id : number,
    drafted : boolean,
    first_name : string,
    last_name : string,
    position : string,
    seasons : Array<object>,
    seasonsPlayed : number,
    totalYards? : number,
    totalTouchdowns? : number,
    totalInterceptions? : number,
    totalRushingYards? : number,
    totalRushingTouchdowns? : number,
    totalReceivingYards? : number,
    totalReceivingTouchdowns? : number,
    totalRec? : number,
    totalTds? : number,
    totalYds? : number
}

type Props = {
    data : playerData,
    showDraft? : boolean,
    cb? : Function
}

const PlayerCard = ({ data, showDraft, cb = () => {} } : Props) => {
    const [toggleClassName, setClassName] = useState(false)
    const playerStats = () => {
        switch (data.position) {
            case "QB":
                return (
                    <div>
                        <h5>Total Passing Yards: {data.totalYards}</h5>
                        <h5>Total Touchdowns: {data.totalTouchdowns}</h5>
                        <h5>Total Interceptions: {data.totalInterceptions}</h5>
                    </div>
                )
            break;
            case "RB":
                return (
                    <div>
                        <h5>Total Rushing Yards: {data.totalRushingYards}</h5>
                    </div>
                )
        }
    }
    return (
        <div className={`${styles.playerCard} ${data.drafted ? styles.drafted : ""}`}>
            <div className={toggleClassName === false ? styles.content : styles.content+" "+styles.flip}>
                <div className={styles.front} data-p={data.position}>
                    <div className={styles.header}>
                        {showDraft && (
                            <div className={styles.draftBtn}>
                                <button type="button" onClick={() => cb(data)}>Draft</button>
                            </div>
                        )}
                        {/* <div className={styles.stats}>
                            <button onClick={() => setClassName(!toggleClassName)}>Career Stats</button>
                        </div> */}
                    </div>
                    <div className={styles.upper}>
                        <h3>{data.first_name+" "+data.last_name}</h3>
                        <h4>{data.position}</h4>
                    </div>
                    <div className={styles.logo}>
                        <h4>Fantasy Football Heros</h4>
                    </div>
                </div>
                <div className={styles.back}>
                    <div className={styles.stats}>
                        <button onClick={() => setClassName(!toggleClassName)}>Show Front</button>
                    </div>
                    <div className={styles.statContent}>
                        <h3>{data.first_name+" "+data.last_name}</h3>
                        <div className={styles.statInfo}>
                            <h5>Total Seasons Played: {data.seasonsPlayed}</h5>
                            <div>
                                <h5>Rookie Season: {data.seasons[0].season}</h5>
                                <h5>Retired: {data.seasons[data.seasons.length - 1].season}</h5>
                            </div>
                            {playerStats()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerCard