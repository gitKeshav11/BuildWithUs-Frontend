import axios from 'axios';
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'sonner';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

type BackendResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor - attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('bwu_access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - unwrap backend response + handle refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse<BackendResponse>) => {
    if (
      response?.data &&
      typeof response.data === 'object' &&
      'data' in response.data
    ) {
      return {
        ...response,
        data: response.data.data,
        meta: {
          success: response.data.success,
          message: response.data.message,
        },
      };
    }

    return response;
  },
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    const requestUrl = originalRequest?.url || '';

    const isRefreshCall = requestUrl.includes('/auth/refresh');
    const isAuthCallbackFlow =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/register') ||
      requestUrl.includes('/users/me');

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('bwu_refresh_token');

        if (!refreshToken) {
          handleLogout();
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const payload = response.data?.data ?? response.data;
        const { accessToken, refreshToken: newRefreshToken } = payload || {};

        if (!accessToken) {
          handleLogout();
          return Promise.reject(error);
        }

        localStorage.setItem('bwu_access_token', accessToken);

        if (newRefreshToken) {
          localStorage.setItem('bwu_refresh_token', newRefreshToken);
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    // Show error toast for non-auth errors
    if (error.response?.status !== 401) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Something went wrong';

      if ((error.response?.status ?? 0) >= 500) {
        toast.error('Server error. Please try again.');
      } else if (error.response?.status !== 404) {
        toast.error(message);
      }
    } else if (!isAuthCallbackFlow) {
      handleLogout();
    }

    return Promise.reject(error);
  }
);

function handleLogout() {
  localStorage.removeItem('bwu_access_token');
  localStorage.removeItem('bwu_refresh_token');
  localStorage.removeItem('bwu_user');
  window.location.href = '/auth/sign-in';
}

export default apiClient;