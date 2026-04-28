import apiClient from '../lib/axios';
import type { AuthTokens, SignInRequest, SignUpRequest, User } from '../types';

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080';

function unwrapData<T>(value: any): T {
  return value?.data ?? value;
}

function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('bwu_access_token', accessToken);
  localStorage.setItem('bwu_refresh_token', refreshToken);
}

function clearAuthStorage() {
  localStorage.removeItem('bwu_access_token');
  localStorage.removeItem('bwu_refresh_token');
  localStorage.removeItem('bwu_user');
  localStorage.removeItem('bwu_auth');
}

export const authService = {
  signIn: async (data: SignInRequest): Promise<AuthTokens> => {
    const response = await apiClient.post('/auth/login', data);
    const tokens = unwrapData<AuthTokens>(response.data);

    if (tokens?.accessToken && tokens?.refreshToken) {
      saveTokens(tokens.accessToken, tokens.refreshToken);
    }

    return tokens;
  },

  signUp: async (data: SignUpRequest): Promise<AuthTokens> => {
    const response = await apiClient.post('/auth/register', data);
    const tokens = unwrapData<AuthTokens>(response.data);

    if (tokens?.accessToken && tokens?.refreshToken) {
      saveTokens(tokens.accessToken, tokens.refreshToken);
    }

    return tokens;
  },

  signOut: async (): Promise<void> => {
    const refreshToken = localStorage.getItem('bwu_refresh_token');

    try {
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } finally {
      clearAuthStorage();
    }
  },

  refreshToken: async (
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    const tokens = unwrapData<{ accessToken: string; refreshToken: string }>(
      response.data
    );

    if (tokens?.accessToken && tokens?.refreshToken) {
      saveTokens(tokens.accessToken, tokens.refreshToken);
    }

    return tokens;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, password });
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return unwrapData<User>(response.data);
  },

  googleAuth: () => {
    window.location.href = `${BACKEND_BASE_URL}/oauth2/authorization/google`;
  },

  githubAuth: () => {
    window.location.href = `${BACKEND_BASE_URL}/oauth2/authorization/github`;
  },

  linkedinAuth: () => {
    window.location.href = `${BACKEND_BASE_URL}/oauth2/authorization/linkedin`;
  },

  handleOAuthCallback: (token: string, refreshToken: string, user: User) => {
    saveTokens(token, refreshToken);
    localStorage.setItem('bwu_user', JSON.stringify(user));
  },

  saveTokens,
  clearAuthStorage,
};

export default authService;