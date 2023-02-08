import React, { useState } from "react"
import { Button } from "./Filter"
import styles from "../styles/PlayerCard.module.css"

interface playerData {
    id : number,
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
        <div className={styles.playerCard}>
            <div className={toggleClassName === false ? styles.content : styles.content+" "+styles.flip}>
                <div className={styles.front}>
                    {showDraft && (
                        <div className={styles.draftBtn}>
                            <button type="button" onClick={() => cb(data)}>Draft</button>
                        </div>
                    )}
                    <div className={styles.stats}>
                        <button onClick={() => setClassName(!toggleClassName)}>Career Stats</button>
                    </div>
                    <div className={styles.upper}>
                        <h3>{data.first_name+" "+data.last_name}</h3>
                        <h4>{data.position}</h4>
                    </div>
                    <div className={styles.logo}>
                        <svg width="270" viewBox="0 0 270 50" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <filter id="textFilter" width="300%" height="300%" x="-150%" y="-150%">
                                    <feSpecularLighting surfaceScale="0.6" specularConstant="1.5" specularExponent="10" lighting-color="orange" in="sourceGraphic" result="lights-final">
                                        <fePointLight x="135" y="-10" z="120"></fePointLight>
                                    </feSpecularLighting>
                                    <feComposite in="lights-final" in2="sourceGraphic" result="comp" operator="in"></feComposite>
                                </filter>
                            </defs>
                            <g filter="url(#textFilter)">
                                <text x="135" y="40" text-anchor="middle">
                                    <tspan>Fantasy</tspan>
                                    <tspan> Football </tspan>
                                    <tspan>Heroes</tspan>
                                </text>
                            </g>
                        </svg>
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