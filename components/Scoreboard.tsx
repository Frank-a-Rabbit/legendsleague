// import react and useState and useEffect
import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/Scoreboard.module.css';
import { databaseConnection } from '../utils/Firebase';
import { Player, IteamDraft, IopponentDraft } from '../utils/Interfaces';
import ScoreCard from './ScoreCard';
import { UserContext, userCtx } from "../context/UserContext"

type Props = {
    teamDraft: IteamDraft,
    opponentDraft: IopponentDraft,
    resetDraft: Function
}

const Scoreboard = ({ teamDraft, opponentDraft, resetDraft }: Props) => {
    const [teamScores, setTeamScores] = useState<Array<any>>([]);
    const [opponentScores, setOpponentScores] = useState<Array<any>>([]);
    const [teamScoringComplete, setTeamScoringComplete] = useState(false);
    const [opponentScoringComplete, setOpponentScoringComplete] = useState(false);
    const [teamOverallScore, setTeamOverallScore] = useState(0)
    const [opponentOverallScore, setOpponentOverallScore] = useState(0)
    const [showTeamBoard, setShowTeamBoard] = useState(true)
    const getRandomGame = (player: object) => {
        const seasons = player.seasons
        const randomSeason = seasons[Math.floor(Math.random() * seasons.length)]
        const randomGame = Math.floor(Math.random() * randomSeason.games)
        return { season : randomSeason.season, game : randomGame }
    }
    const toggleTeamBoard = (team: string) => {
        if (team === "opponent") {
            setShowTeamBoard(false)
        } else {
            setShowTeamBoard(true)
        }
    }
    useEffect(() => {
        const team = [...teamDraft["QB"], ...teamDraft["RB"], ...teamDraft["WR"]]
        const oppsTeam = [...opponentDraft.positions[0].players, ...opponentDraft.positions[1].players, ...opponentDraft.positions[2].players]
        const getPlayerGameData = async (player: object) => {
            const { season, game } = getRandomGame(player)
            const randomSeason = season
            const randomGame = (player.position === "WR" && player.player_id !== 36) ? game + 1 : game
            const res = await databaseConnection.collection("legendseason").doc(""+player.player_id+"").collection(""+randomSeason+"").doc(""+randomGame+"").get()
            .then((doc) => {
                if (doc.exists) {
                    return { player_id : player.player_id, position : player.position, gameStats : doc.data(), name : player.first_name[0]+". "+player.last_name }
                } else {
                    console.log("No such document for ", player.player_id, " in ", randomSeason, " week ", randomGame, "!")
                }
            })
            return res
        }
        const calculateScore = (players: any, team: string) => {
            let overallScore: number = 0
            const scores = players.map(player => {
                let total, gameDate, overallStats
                if (player.position === "QB") {
                    let passingYardsPts = player.gameStats.yds * 0.1
                    let tdPts = player.gameStats.tds * 6
                    let intPts = player.gameStats.ints * -2
                    let sackPts = player.gameStats.sacks * -1
                    overallStats = { yards : player.gameStats.yds, tds : player.gameStats.tds, ints : player.gameStats.ints, sacks : player.gameStats.sacks }
                    gameDate = player.gameStats.game_date+"/"+player.gameStats.season
                    total = Math.round(passingYardsPts + tdPts + intPts + sackPts)
                    overallScore += total
                } else if (player.position === "RB") {
                    let rushingYardsPts = player.gameStats.rushing_yards * 0.1
                    let rushingTdPts = player.gameStats.rushing_touchdowns * 6
                    let rushingLongPts = player.gameStats.rushing_long * 0.1
                    let receptionsPts = player.gameStats.receptions * 0.1
                    let receptionTdsPts = player.gameStats.rec_touchdowns * 6
                    let receptionYardsPts = player.gameStats.rec_yards * 0.1
                    let receptionLongPts = player.gameStats.rec_long * 0.1
                    overallStats = { receptions : player.gameStats.receptions, rec_yards : player.gameStats.rec_yards, rec_touchdowns : player.gameStats.rec_touchdowns, rec_long : player.gameStats.rec_long, rushing_yards : player.gameStats.rushing_yards, rushing_touchdowns : player.gameStats.rushing_touchdowns, rushing_long : player.gameStats.rushing_long }
                    gameDate = player.gameStats.game_date+"/"+player.gameStats.season
                    total = Math.round(rushingYardsPts + rushingTdPts + rushingLongPts + receptionsPts + receptionTdsPts + receptionYardsPts + receptionLongPts)
                    overallScore += total
                } else {
                    let recPts = player.gameStats.game.receptions * 2
                    let recTdPts = player.gameStats.game.weekTds * 6
                    let recYardsPts = player.gameStats.game.weekYards * 0.1
                    overallStats = { receptions : player.gameStats.game.receptions, yards : player.gameStats.game.weekYards, touchdowns : player.gameStats.game.weekTds }
                    gameDate = player.gameStats.game.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$2/$3/$1')
                    total = Math.round(recPts + recTdPts + recYardsPts)
                    overallScore += total
                }
                return { player_id: player.player_id, name: player.name, position: player.position, score: total, game_date : gameDate, overallStats : overallStats }
            })
            if (team === "team") {
                setTeamScores(scores);
                setTeamScoringComplete(true);
                setTeamOverallScore(overallScore)
            } else {
                setOpponentScores(scores)
                setOpponentScoringComplete(true)
                setOpponentOverallScore(overallScore)
            }
            if (teamOverallScore > 0 && opponentOverallScore > 0) {
                console.log("teamOverallScore: ", teamOverallScore, " opponentOverallScore: ", opponentOverallScore)
            }
        }
        const fetchPlayerData = async () => {
            const teamPlayers = await Promise.all(team.map((player) => getPlayerGameData(player)));
            const opponentPlayers = await Promise.all(oppsTeam.map((player) => getPlayerGameData(player)));
      
            calculateScore(teamPlayers, "team");
            calculateScore(opponentPlayers, "opponent");
          };
      
        fetchPlayerData();
    }, [teamDraft, opponentDraft])
    return (
        <div className={styles.scoreboard}>
            {teamScoringComplete && opponentScoringComplete && (
                <div className={styles.overallCont}>
                    <button className={styles.replay} onClick={() => resetDraft()}>Play Again</button>
                    <div className={styles.scores}>
                        <span>Team Total: {teamOverallScore}</span>
                        <span>Opponent Total: {opponentOverallScore}</span>
                    </div>
                    <div className={styles.toggles}>
                        <button onClick={() => toggleTeamBoard("team")}>Team Scores</button>
                        <button onClick={() => toggleTeamBoard("opponent")}>Opponent Scores</button>
                    </div>
                </div>
            )}
            {showTeamBoard && (
                <div className={styles.teamBoard}>
                {teamScoringComplete &&
                    teamScores.map((score) => {
                        return (
                            <ScoreCard key={score.player_id} gameSummary={score}></ScoreCard>
                        );
                })}
                </div>
            )}
            {!showTeamBoard && (
                <div className={styles.opponentBoard}>
                {opponentScoringComplete && (
                    opponentScores.map((score) => {
                        return (
                            <ScoreCard key={score.player_id} gameSummary={score}></ScoreCard>
                        ) 
                    })
                )}
                </div>
            )}
        </div>
    )
}

export default Scoreboard
