import { APIResponse, PlayResponse, Player } from "../types/types";

/**
 * Service class for interacting with the Plinko backend.
 */
export class PlinkoBackendService {
    /**
     * Simulates playing Plinko game.
     * @param {number} playerId - The ID of the player.
     * @param {number} creditsToDeduct - The number of credits to deduct for playing.
     * @returns {Promise<PlayResponse>} A promise resolving to the play response.
     */
    async play(playerId: number, creditsToDeduct: number): Promise<PlayResponse> {
        // Imagine this being an HTTP request to a backend API.
        const response = await this.mockedPlayEndpoint(playerId, creditsToDeduct);

        console.log(response);

        if (response.success) {
            return response.result;
        }

        throw new Error(response.message);
    }
    
    //#region This would reside on a backend server
    private totalSlots: number = 9;
    private dbPlayers: Player = {
        1: 100
    };
    
    /**
     * Simulates a play endpoint on the backend.
     * @param {number} playerId - The ID of the player.
     * @param {number} creditsToDeduct - The number of credits to deduct for playing.
     * @returns {Promise<APIResponse<PlayResponse>>} A promise resolving to the API response.
     */
    private async mockedPlayEndpoint(playerId: number, creditsToDeduct: number): Promise<APIResponse<PlayResponse>> {
        let response = {} as APIResponse<PlayResponse>;
        response.success = false;

        if (creditsToDeduct != 10) {
            response.message = "Unable to play, must deduct at least 10 credits."
            return response;
        }

        let playerBalance = this.dbPlayers[playerId];

        if (playerBalance == undefined) {
            response.message = "Unable to play as player does not exist."
            return response;
        }

        if (playerBalance - creditsToDeduct < 0) {
            response.message = "No credits left to play."
            return response;
        }
        
        playerBalance -= creditsToDeduct;

        console.log(`Player ${playerId} has ${playerBalance} credits left.`);

        const [slotIndex, earnings, isWinningSlot]  = this.chooseSlotToLandIn();

        playerBalance += earnings;

        console.log(`Player ${playerId} has ${playerBalance} credits left.`);

        this.dbPlayers[playerId] = playerBalance;
        
        response.success = true;
        response.result = {
            newBalance: playerBalance,
            slotEarnings: earnings,
            slot: slotIndex,
            isWinningSlot: isWinningSlot
        } as PlayResponse;

        return response;
    }

    /**
     * Chooses a slot for the ball to land in.
     * @returns {any[]} An array containing the slot index, earnings, and whether it's a winning slot.
     */
    private chooseSlotToLandIn(): any[] {
        const slotValues = [10, 5, 2, 1, 0, 1, 2, 5, 10];
        const slotWeighting = [5, 10, 20, 40, 50, 40, 20, 10, 5]

        const chosenSlot = this.randomByWeight(Array.from(slotValues.keys()), slotWeighting);

        const isWinningSlot = chosenSlot == 0 || chosenSlot == slotValues.length - 1 ?
            true : false;
        return [chosenSlot, slotValues[chosenSlot], isWinningSlot];
    }

    /**
     * Chooses a random value based on weightings.
     * @param {number[]} values - The array of values to choose from.
     * @param {number[]} weights - The array of weights for each value.
     * @returns {number} The chosen value.
     */
    private randomByWeight(values: number[], weights: number[]): number {
        let total = 0;
      
        weights.forEach(weight => {
          total += weight
        });
      
        const random = Math.ceil(Math.random() * total);
      
        let cursor = 0;
        for (let i = 0; i < weights.length; i++) {
          cursor += weights[i]
          if (cursor >= random) {
            return values[i];
          }
        }

        throw new Error("Unable to choose slot.");
    }
    //#endregion
}
