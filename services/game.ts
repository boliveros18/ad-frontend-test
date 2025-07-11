import axios from "axios";

export const getGames = async (genre?: string, page?: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_API_GAMES_URL}`,
      {
        params: {
          genre,
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get games data:", error);
    throw error;
  }
};
