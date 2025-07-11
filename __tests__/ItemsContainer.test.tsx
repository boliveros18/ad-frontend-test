import { render, screen, fireEvent } from "@testing-library/react";
import { ItemsContainer } from "@/components/ItemsContainer";
import { GameContext, type GamesResponse } from "@/context/game";
import { UiContext } from "@/context/ui";
import "@testing-library/jest-dom";

const mockGetGames = jest.fn();

const mockUiContext = {
  filter: "",
  setFilter: jest.fn(),
  isLoading: false,
  setIsLoading: jest.fn(),
};

const mockGames: GamesResponse = {
  paginatedGames: [
    {
      id: "1",
      name: "Cyberpunk 2077",
      genre: "Action",
      image: "/game-images/cyberpunk2077.jpeg",
      description: "",
      price: 59.99,
      isNew: false,
    },
    {
      id: "2",
      name: "The Witcher 3: Wild Hunt",
      genre: "RPG",
      image: "/game-images/thewitcher3.jpeg",
      description: "",
      price: 39.99,
      isNew: false,
    },
  ],
  currentPage: 1,
  totalPages: 2,
  availableFilters: ["Action", "RPG", "Adventure"],
};

const renderWithContexts = (gamesOverride: GamesResponse = mockGames) => {
  return render(
    <UiContext.Provider value={mockUiContext}>
      <GameContext.Provider
        value={{ games: gamesOverride, getGames: mockGetGames }}
      >
        <ItemsContainer />
      </GameContext.Provider>
    </UiContext.Provider>
  );
};

describe("ItemsContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders game cards when paginatedGames are available", () => {
    renderWithContexts();

    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
    expect(screen.getByText("The Witcher 3: Wild Hunt")).toBeInTheDocument();
  });

  it("renders skeletons when currentPage is 0", () => {
    const gamesWithNoData: GamesResponse = {
      ...mockGames,
      currentPage: 0,
      paginatedGames: [],
    };

    renderWithContexts(gamesWithNoData);

    const skeletons = screen.getAllByTestId("card-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("calls getGames when clicking 'SEE MORE'", () => {
    renderWithContexts();

    fireEvent.click(screen.getByText(/see more/i));

    expect(mockGetGames).toHaveBeenCalledWith("", 2);
  });

  it("does not render 'SEE MORE' if on last page", () => {
    const lastPageGames: GamesResponse = {
      ...mockGames,
      currentPage: 2,
      totalPages: 2,
    };

    renderWithContexts(lastPageGames);

    expect(screen.queryByText(/see more/i)).not.toBeInTheDocument();
  });
});
