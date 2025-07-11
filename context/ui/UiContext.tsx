import { createContext } from "react";

interface ContextProps {
  filter: string;
  isLoading: boolean;
  setFilter: (payload: string) => void;
  setIsLoading: (payload: boolean) => void;
}

export const UiContext = createContext({} as ContextProps);
