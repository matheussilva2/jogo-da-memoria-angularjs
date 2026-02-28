export interface Match {
    player_name: string;
    score: number;
    date: Date;
}

export interface Player {
    name: string;
    high_score: number;
    match_history: Match[];
}