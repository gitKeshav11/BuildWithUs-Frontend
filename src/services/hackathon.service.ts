import apiClient from '../lib/axios';
import type { Hackathon, TeamPost, PaginatedResponse } from '../types';

export const hackathonService = {
  getHackathons: async (params?: {
    page?: number;
    size?: number;
    search?: string;
    mode?: string;
  }): Promise<PaginatedResponse<Hackathon>> => {
    const response = await apiClient.get('/hackathons', { params });
    return response.data;
  },

  getHackathon: async (id: string): Promise<Hackathon> => {
    const response = await apiClient.get(`/hackathons/${id}`);
    return response.data;
  },

  getTeamPosts: async (params?: {
    page?: number;
    size?: number;
    hackathonId?: string;
    type?: string;
  }): Promise<PaginatedResponse<TeamPost>> => {
    const response = await apiClient.get('/hackathons/team-finder', { params });
    return response.data;
  },

  createTeamPost: async (data: Partial<TeamPost>): Promise<TeamPost> => {
    const response = await apiClient.post('/hackathons/team-finder', data);
    return response.data;
  },

  requestToJoin: async (teamPostId: string, message: string): Promise<void> => {
    await apiClient.post(`/hackathons/team-finder/${teamPostId}/join`, {
      message,
    });
  },

  createHackathon: async (data: Partial<Hackathon>): Promise<Hackathon> => {
    const response = await apiClient.post('/hackathons', data);
    return response.data;
  },
};

export default hackathonService;