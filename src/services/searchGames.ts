import { APP_CONFIG } from '@/config/config';
import { ICasinoGame } from '@/types/game';

interface ISearchGamesResponse {
  success: boolean;
  data: {
    items: ICasinoGame[];
  };
}

/**
 * @description Fetches the games based on the specified query; throws an error if the query is not specified.
 * @returns search API response
 */
export const searchGames = async (
  query: string
): Promise<ISearchGamesResponse> => {
  if (!query) {
    throw new Error('Query is required');
  }
  try {
    const games = await fetch(
      `${APP_CONFIG.apiBaseURL}/casino/games/search?query=${query}`
    ).then((res) => res.json());
    return games;
  } catch (err) {
    console.error('Error searching games', err);
    throw err;
  }
};
