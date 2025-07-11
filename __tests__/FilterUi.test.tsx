import { render, screen, fireEvent } from "@testing-library/react";
import { FilterUi } from "@/components/ui/FilterUi";
import { UiContext } from "@/context/ui";
import { GameContext, type GamesResponse } from "@/context/game";
import "@testing-library/jest-dom";

const mockSetFilter = jest.fn();
const mockGetGames = jest.fn();

const mockUiContext = {
  filter: "",
  setFilter: mockSetFilter,
  isLoading: false,
  setIsLoading: jest.fn(),
};

const mockGames: GamesResponse = {
  paginatedGames: [],
  currentPage: 1,
  totalPages: 1,
  availableFilters: ["Action", "RPG", "Adventure"],
};

const renderWithContexts = () => {
  return render(
    <UiContext.Provider value={mockUiContext}>
      <GameContext.Provider value={{ games: mockGames, getGames: mockGetGames }}>
        <FilterUi />
      </GameContext.Provider>
    </UiContext.Provider>
  );
};

describe("FilterUi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders default label 'All'", () => {
    renderWithContexts();
    expect(screen.getByText("Genre")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
  });

  it("displays all filter options when dropdown is clicked", async () => {
    renderWithContexts();
    fireEvent.click(screen.getByRole("button", { name: /all/i }));

    expect(await screen.findByText("Action")).toBeInTheDocument();
    expect(screen.getByText("RPG")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
  });

  it("calls setFilter and getGames when clicking a filter option", async () => {
    renderWithContexts();

    fireEvent.click(screen.getByRole("button", { name: /all/i }));

    const rpgOption = await screen.findByText("RPG");
    fireEvent.click(rpgOption);

    expect(mockSetFilter).toHaveBeenCalledWith("RPG");
    expect(mockGetGames).toHaveBeenCalledWith("RPG");
  });

  it("calls setFilter with empty string when clicking 'All'", async () => {
    renderWithContexts();

    fireEvent.click(screen.getByRole("button", { name: /all/i }));

    const allDropdownOption = await screen.findAllByText("All");

    expect(allDropdownOption.length).toBeGreaterThan(1);

    fireEvent.click(allDropdownOption[1]);

    expect(mockSetFilter).toHaveBeenCalledWith("");
    expect(mockGetGames).toHaveBeenCalledWith();
  });
});
