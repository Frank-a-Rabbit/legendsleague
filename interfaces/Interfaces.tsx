export interface IdraftPlayer {
    drafted: boolean,
    position: string,
    player_id: Number,
    data?: object
}

export interface IdraftStruct {
    opponentDraft: {
        positions: [
            { position : string,  players : Array<object> },
            { position : string,  players : Array<object> },
            { position : string,  players : Array<object> },
        ],
        finalized: boolean
    }
}