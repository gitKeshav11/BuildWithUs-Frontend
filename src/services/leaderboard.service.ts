import apiClient from '../lib/axios';
import type { LeaderboardEntry, Badge } from '../types';

export const leaderboardService = {
  //  CHANGE: return response.data.content
  getLeaderboard: async (params?: {
    page?: number;
    size?: number;
    period?: 'ALL_TIME' | 'MONTHLY' | 'WEEKLY';
  }): Promise<LeaderboardEntry[]> => {
    const response = await apiClient.get('/leaderboard', { params });
    return response.data.content;
  },

  // backend me endpoint nahi hai
  // getAllBadges: async (): Promise<Badge[]> => {
  //   const response = await apiClient.get('/badges');
  //   return response.data;
  // },

  //  CHANGE: endpoint update
  getUserBadges: async (userId: string): Promise<Badge[]> => {
    const response = await apiClient.get(`/leaderboard/user/${userId}/badges`);
    return response.data;
  },

  // backend me endpoint nahi hai
  // getTrendingDevelopers: async (limit?: number): Promise<LeaderboardEntry[]> => {
  //   const response = await apiClient.get('/leaderboard/trending', { params: { limit } });
  //   return response.data;
  // },
};