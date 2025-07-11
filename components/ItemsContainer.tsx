import { useContext } from "react";
import { GameContext } from "@/context/game";
import { UiContext } from "@/context/ui";
import { Card } from "./Card";
import { CardSkeleton } from "./CardSkeleton";

export const ItemsContainer = () => {
  const { games, getGames } = useContext(GameContext);
  const { filter } = useContext(UiContext);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-8 sm:pt-12 sm:px-6 xs:max-w-md sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-7xl  lg:px-8">
        <h2 className="sr-only">Games</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {games.currentPage != 0
            ? games.paginatedGames.map((game) => (
                <div key={game.id}>
                  <Card game={game} />
                </div>
              ))
            : Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
        {games.totalPages > games.currentPage ? (
          <button
            onClick={() => getGames(filter, games.currentPage + 1)}
            className="my-8 sm:mt-12 sm:mb-14 w font-semibold flex items-center justify-center rounded-lg px-6 py-4 text-base text-white bg-gray-700 hover:bg-gray-800 cursor-pointer border shadow"
          >
            SEE MORE
          </button>
        ) : (
          <div className="pb-8 sm:pb-12"></div>
        )}
      </div>
    </div>
  );
};
