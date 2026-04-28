import apiClient from '../lib/axios';
import type { Job, PaginatedResponse } from '../types';

export const jobsService = {
  getJobs: async (params?: {
    page?: number;
    size?: number;
    search?: string;
    type?: string;
    mode?: string;
    skills?: string;
  }): Promise<PaginatedResponse<Job>> => {
    const response = await apiClient.get('/jobs', { params });
    return response.data;
  },

  getJob: async (id: string): Promise<Job> => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  saveJob: async (jobId: string): Promise<void> => {
    await apiClient.post(`/jobs/${jobId}/save`);
  },

  unsaveJob: async (jobId: string): Promise<void> => {
    await apiClient.delete(`/jobs/${jobId}/save`);
  },

  getSavedJobs: async (): Promise<Job[]> => {
    const response = await apiClient.get('/jobs/saved');
    return response.data?.content ?? response.data ?? [];
  },

  getLatestJobs: async (limit = 10): Promise<Job[]> => {
    const response = await apiClient.get('/jobs/featured', {
      params: { page: 0, size: limit },
    });
    return response.data?.content ?? [];
  },

  createJob: async (data: Partial<Job>): Promise<Job> => {
    const response = await apiClient.post('/jobs', data);
    return response.data;
  },

  updateJob: async (id: string, data: Partial<Job>): Promise<Job> => {
    const response = await apiClient.put(`/jobs/${id}`, data);
    return response.data;
  },

  deleteJob: async (id: string): Promise<void> => {
    await apiClient.delete(`/jobs/${id}`);
  },
};

export default jobsService;