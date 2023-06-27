type PlayerCommomFields = {
    game_date: string;
    player_id: number;
    position: string;
    season: number;
    week: number;
    drafted: boolean;
}

export type Player = PlayerCommomFields & {
    att: number;
    average: number;
    comp: number;
    game_date: string;
    ints: number;
    pct: number;
    player_id: number;
    position: string;
    rating: number;
    sacks: number;
    season: number;
    tds: number;
    week: number;
    yds: number;
    attempts: number;
    rec_average: number;
    rec_long: number;
    rec_touchdowns: number;
    rec_yards: number;
    receptions: number;
    rushing_average: number;
    rushing_long: number;
    rushing_touchdowns: number;
    rushing_yards: number;
    long: number;
    touchdowns: number;
    yards: number;
    weekTds: number;
    weekYards: number;
}

export interface IteamDraft {
    QB: Array<Player>,
    RB: Array<Player>,
    WR: Array<Player>,
    finalized: boolean
}

export interface IopponentDraft {
    positions: Array<{
        position: string,
        players: Array<Player>
    }>,
    finalized: boolean
}

export interface IscoreCard {
    player_id: number,
    name: string,
    position: string,
    score: number,
    game_date: string,
    season: number | string,
    overallStats: Player
}