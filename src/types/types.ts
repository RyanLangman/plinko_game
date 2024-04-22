type Coordinate = [number, number];

type Player = Record<number, number>;

type APIResponse<T> = {
    message: string,
    success: boolean,
    result: T
}

type PlayResponse = {
    slotEarnings: number,
    newBalance: number,
    slot: number
}

export { Coordinate, Player, APIResponse, PlayResponse };