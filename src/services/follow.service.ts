import apiClient from '../lib/axios';
import type { User, PaginatedResponse } from '../types';

export const followService = {
  follow: async (userId: string): Promise<void> => {
    await apiClient.post(`/follows/${userId}`);
  },

  unfollow: async (userId: string): Promise<void> => {
    await apiClient.delete(`/follows/${userId}`);
  },

  getFollowers: async (
    userId: string,
    params?: { page?: number; size?: number }
  ): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get(`/follows/${userId}/followers`, {
      params,
    });
    return response.data;
  },

  getFollowing: async (
    userId: string,
    params?: { page?: number; size?: number }
  ): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get(`/follows/${userId}/following`, {
      params,
    });
    return response.data;
  },

  isFollowing: async (userId: string): Promise<boolean> => {
    const response = await apiClient.get(`/follows/${userId}/check`);
    return Boolean(response.data);
  },
};

export default followService;