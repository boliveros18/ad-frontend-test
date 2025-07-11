import { FC, useReducer, ReactNode, useCallback } from "react";
import { UiContext, uiReducer } from ".";

export interface State {
  isLoading: boolean;
  filter: string;
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  isLoading: false,
  filter: "",
};

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  const setFilter = useCallback((payload: string) => {
    dispatch({ type: "SET_FILTER", payload: payload });
  }, []);

  const setIsLoading = useCallback((payload: boolean) => {
    dispatch({ type: "SET_IS_LOADING", payload: payload });
  }, []);

  return (
    <UiContext.Provider
      value={{
        ...state,
        setFilter,
        setIsLoading,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
