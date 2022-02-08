import { GameState } from "./types";

let state: GameState
let currentCounter: number;
let canVote : boolean;

export const setState = (newState:GameState) => {
    state = newState;
}

export const getState = () => {
    return state;
}

export const getCurrentCounter = () => {
    return currentCounter;
}
export const setCurrentCounter = () => {
    currentCounter = state.counter;
}
export const getCanVote = () => {
    return canVote;
}
export const setCanVote = (flag: boolean) => {
    canVote = flag;
}

