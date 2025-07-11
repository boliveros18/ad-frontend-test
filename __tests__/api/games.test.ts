import handler from "@/pages/api/games";
import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";

jest.mock("@/utils/endpoints", () => ({
  allGames: [
    { id: "1", name: "Game A", genre: "Action", price: 10 },
    { id: "2", name: "Game B", genre: "RPG", price: 20 },
    { id: "3", name: "Game C", genre: "Action", price: 30 },
  ],
  availableFilters: ["Action", "RPG"],
  delay: jest.fn(() => Promise.resolve()),
}));

describe("API /api/games", () => {
  it("returns all paginated games without genre filter", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: { page: "1" },
    });

    await handler(req, res);

    const json = res._getJSONData();

    expect(res._getStatusCode()).toBe(200);
    expect(json.paginatedGames.length).toBe(3);
    expect(json.availableFilters).toEqual(["Action", "RPG"]);
    expect(json.totalPages).toBe(1);
    expect(json.currentPage).toBe(1);
  });

  it("returns games filtered by genre", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: { genre: "Action", page: "1" },
    });

    await handler(req, res);
    const json = res._getJSONData();

    expect(json.paginatedGames.length).toBe(2);
    expect(json.paginatedGames[0].genre).toBe("Action");
  });

  it("automatically corrects invalid pages", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: { page: "invalid" },
    });

    await handler(req, res);
    const json = res._getJSONData();

    expect(json.currentPage).toBe(1);
  });
});
