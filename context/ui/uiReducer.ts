import { State } from ".";

type SetFilter = { type: "SET_FILTER"; payload: string };
type SetIsLoading = { type: "SET_IS_LOADING"; payload: boolean };

type ActionType = SetFilter | SetIsLoading;

export const uiReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
