import { APP_CONFIG } from '@/config/config';
import { ICasinoGame } from '@/types/game';

interface IGetGameResponse {
  success: boolean;
  data: {
    count: number;
    total: number;
    items: ICasinoGame[];
  };
}

/**
 * @description Fetches the games based on the specified filter; throws an error if the filter is not specified.
 * @returns games API response
 */
export const getGames = async (
  filter: string,
  limit: number = 10,
  offset: number = 0
): Promise<IGetGameResponse> => {
  if (!filter) {
    console.error('No filter specified');
    throw new Error('Filter is missing');
  }
  try {
    const gameResponse = await fetch(
      `${APP_CONFIG.apiBaseURL}/casino/games?limit=${limit}&offset=${offset}&${filter}`
    ).then((res) => res.json());
    return gameResponse;
  } catch (err) {
    console.error('Error fetching games', err);
    throw err;
  }
};
