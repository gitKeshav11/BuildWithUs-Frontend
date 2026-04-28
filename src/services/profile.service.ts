import apiClient from '../lib/axios';
import type { Profile, PaginatedResponse } from '../types';

function unwrapData<T>(value: any): T {
  return value?.data ?? value;
}

function normalizePaginatedProfiles(value: any): PaginatedResponse<Profile> {
  const data = unwrapData<any>(value);

  if (data?.content) {
    return data as PaginatedResponse<Profile>;
  }

  if (Array.isArray(data)) {
    return {
      content: data,
      page: 0,
      size: data.length,
      totalElements: data.length,
      totalPages: 1,
      first: true,
      last: true,
      hasNext: false,
      hasPrevious: false,
    };
  }

  return {
    content: [],
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
  };
}

function normalizeUserAsProfile(user: any): Profile {
  return {
    ...user,
    isVerified: user?.isVerified ?? user?.emailVerified ?? false,
    followersCount: user?.followersCount ?? 0,
    followingCount: user?.followingCount ?? 0,
    projectsCount: user?.projectsCount ?? 0,
    skills: user?.skills ?? [],
    linkedinUrl: user?.linkedinUrl ?? '',
    githubUrl: user?.githubUrl ?? '',
    portfolioUrl: user?.portfolioUrl ?? '',
  } as Profile;
}

export const profileService = {
  getProfile: async (username: string): Promise<Profile> => {
    const response = await apiClient.get(`/profiles/${username}`);
    return unwrapData<Profile>(response.data);
  },

  getMyProfile: async (): Promise<Profile> => {
    try {
      const response = await apiClient.get('/profiles/me');
      return unwrapData<Profile>(response.data);
    } catch {
      const response = await apiClient.get('/users/me');
      const user = unwrapData<any>(response.data);
      return normalizeUserAsProfile(user);
    }
  },

  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await apiClient.put('/profiles/me', data);
    return unwrapData<Profile>(response.data);
  },

  uploadPhoto: async (file: File): Promise<Profile> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/profiles/me/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return unwrapData<Profile>(response.data);
  },

  getAllDevelopers: async (params?: {
    page?: number;
    size?: number;
    search?: string;
    skills?: string;
    isAvailable?: boolean;
  }): Promise<PaginatedResponse<Profile>> => {
    const response = await apiClient.get('/profiles', { params });
    return normalizePaginatedProfiles(response.data);
  },

  searchDevelopers: async (query: string): Promise<Profile[]> => {
    const response = await apiClient.get('/profiles/search', {
      params: { keyword: query },
    });

    const data = unwrapData<any>(response.data);

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;

    return [];
  },
};

export default profileService;