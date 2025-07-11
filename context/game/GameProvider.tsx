import { FC, useReducer, ReactNode, useCallback, useContext } from "react";
import { GameContext, gameReducer, GamesResponse } from ".";
import { UiContext } from "@/context/ui";
import { GameService } from "@/services";

export interface State {
  games: GamesResponse;
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  games: {
    paginatedGames: [],
    availableFilters: [],
    totalPages: 0,
    currentPage: 0,
  },
};

export const GameProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const { setIsLoading } = useContext(UiContext);

  const getGames = useCallback(
    async (genre?: string, page?: number) => {
      setIsLoading(true);
      const response = await GameService.getGames(genre, page);
      dispatch({ type: "SET_GAMES", payload: response });
      setIsLoading(false);
    },
    [setIsLoading]
  );

  return (
    <GameContext.Provider
      value={{
        ...state,
        getGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
