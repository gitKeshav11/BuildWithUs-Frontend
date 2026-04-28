import apiClient from '../lib/axios';
import type { Project, PaginatedResponse } from '../types';

export const projectsService = {
  getProjects: async (params?: {
    page?: number;
    size?: number;
    search?: string;
    techStack?: string;
    isOpenForCollaboration?: boolean;
  }): Promise<PaginatedResponse<Project>> => {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (data: Partial<Project>): Promise<Project> => {
    const response = await apiClient.post('/projects', data);
    return response.data;
  },

  updateProject: async (id: string, data: Partial<Project>): Promise<Project> => {
    const response = await apiClient.put(`/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },

  requestCollaboration: async (
    projectId: string,
    message: string
  ): Promise<void> => {
    await apiClient.post(`/projects/${projectId}/collaborate`, { message });
  },

  getMyProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects/my-projects');
    return response.data?.content ?? response.data ?? [];
  },
};

export default projectsService;