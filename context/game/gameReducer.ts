import { GamesResponse, State } from ".";

type SetGames = { type: "SET_GAMES"; payload: GamesResponse };

type ActionType = SetGames;

export const gameReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_GAMES":
      return { ...state, games: action.payload };
    default:
      return state;
  }
};
