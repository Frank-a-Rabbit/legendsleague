import React from "react";
import { IscoreCard } from "../utils/Interfaces";
import styles from "../styles/ScoreCard.module.css";

type Props = {
  gameSummary: IscoreCard;
};

type Stat = {
  label: string;
  value: number;
};

type PositionStats = {
  [position: string]: Stat[];
};

const ScoreCard = ({ gameSummary }: Props) => {

  const positionStats: PositionStats = {
    QB: [
      { label: "Yards", value: gameSummary.overallStats.yards },
      { label: "Touchdowns", value: gameSummary.overallStats.tds },
      { label: "Interceptions", value: gameSummary.overallStats.ints },
      { label: "Sacks", value: gameSummary.overallStats.sacks },
    ],
    RB: [
      { label: "Receptions", value: gameSummary.overallStats.receptions },
      { label: "Receiving Yards", value: gameSummary.overallStats.rec_yards },
      { label: "Receiving Touchdowns", value: gameSummary.overallStats.rec_touchdowns },
      { label: "Receiving Long", value: gameSummary.overallStats.rec_long },
      { label: "Rushing Yards", value: gameSummary.overallStats.rushing_yards },
      { label: "Rushing Touchdowns", value: gameSummary.overallStats.rushing_touchdowns },
      { label: "Rushing Long", value: gameSummary.overallStats.rushing_long },
    ],
    WR: [
      { label: "Receptions", value: gameSummary.overallStats.receptions },
      { label: "Yards", value: gameSummary.overallStats.yards },
      { label: "Touchdowns", value: gameSummary.overallStats.touchdowns },
    ],
  };

  const stats: Stat[] = positionStats[gameSummary.position];

  return (
    <div className={styles.scoreCard}>
      <div>
        <div className={styles.date}>
            <h4 className={styles.gameDate}>Game Date: {gameSummary.game_date}</h4>
        </div>
        <div className={styles.header}>
            <div className={styles.position}>{gameSummary.position}</div>
            <h5>{gameSummary.name}</h5>
            <h5>Score: {gameSummary.score}</h5>
        </div>
      </div>
      <div className={styles.stats}>
        {stats && (
          <div className={styles.inner}>
            {stats.map((stat: Stat, index: number) => (
              <p key={index}>
                <span>{stat.label}:</span><span>{stat.value}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;