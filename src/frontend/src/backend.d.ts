import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reward {
    name: string;
    rank?: bigint;
    score: bigint;
}
export interface LeaderboardEntry {
    name: string;
    score: bigint;
}
export interface backendInterface {
    claimReward(score: bigint): Promise<Reward | null>;
    getTopScores(): Promise<Array<LeaderboardEntry>>;
    submitScore(name: string, score: bigint): Promise<void>;
}
