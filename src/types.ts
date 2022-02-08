export type GameState = {
    counter: number,
    position: {x: number, y: number},
    field: Field,
    direction: Direction,
    aliceCount: number,
}

export enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT,
    STAY,
  }
export enum Field {
    BOMB,
    ALICE,
    NOTHING,
}