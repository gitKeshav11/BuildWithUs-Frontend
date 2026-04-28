import apiClient from '../lib/axios';
import type { User, Job, PaginatedResponse } from '../types';

export const adminService = {
  getUsers: async (params?: {
    page?: number;
    size?: number;
    search?: string;
  }): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  banUser: async (id: string): Promise<void> => {
    await apiClient.post(`/users/${id}/block`);
  },

  unbanUser: async (id: string): Promise<void> => {
    await apiClient.post(`/users/${id}/unblock`);
  },

  getStats: async (): Promise<{
    totalUsers: number;
    totalJobs: number;
    totalProjects: number;
    totalCollaborations: number;
    totalCodeReviews: number;
    totalChatSessions: number;
  }> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  createJob: async (data: Partial<Job>): Promise<Job> => {
    const response = await apiClient.post('/jobs', data);
    return response.data;
  },

  deleteJob: async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`);
  },
};

export default adminService;