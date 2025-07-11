import type { NextApiRequest, NextApiResponse } from "next";
import { allGames, availableFilters, delay } from "@/utils/endpoints";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genre = req.query.genre as string;
  let page = parseInt((req.query.page as string) || "1");

  if (page < 1 || isNaN(page)) page = 1;

  const ITEMS_PER_PAGE = page * 12;

  let games = allGames;

  if (genre) {
    games = games.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  await delay(2000);

  const fromIndex = 0;
  const toIndex = ITEMS_PER_PAGE;
  const paginatedGames = games.slice(fromIndex, toIndex);

  const totalPages = Math.ceil(games.length / 12);

  res.status(200).json({
    paginatedGames,
    availableFilters,
    totalPages,
    currentPage: page,
  });
}
