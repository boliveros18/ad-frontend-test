import { IGame } from "@/interfaces/game";
import { createContext } from "react";

export interface GamesResponse  {
  paginatedGames: IGame[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

interface ContextProps {
  games: GamesResponse ;
  getGames: (genre?: string, page?: number) => void;
}

export const GameContext = createContext({} as ContextProps);
