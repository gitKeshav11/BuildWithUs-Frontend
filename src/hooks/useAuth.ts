import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';
import { toast } from 'sonner';
import type { SignInRequest, SignUpRequest, User } from '../types';

export function useAuth() {
  const { user, isAuthenticated, isLoading, setAuth, logout, setLoading } = useAuthStore();

  const signIn = async (data: SignInRequest) => {
    setLoading(true);
    try {
      const tokens = await authService.signIn(data);

      let resolvedUser = tokens.user as User | undefined;

      if (!resolvedUser) {
        resolvedUser = await authService.getMe();
      }

      setAuth(resolvedUser, tokens.accessToken, tokens.refreshToken);

      toast.success('Welcome back!');
      return {
        ...tokens,
        user: resolvedUser,
      };
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || 'Sign in failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpRequest) => {
    setLoading(true);
    try {
      const tokens = await authService.signUp(data);

      let resolvedUser = tokens.user as User | undefined;

      if (!resolvedUser) {
        resolvedUser = await authService.getMe();
      }

      setAuth(resolvedUser, tokens.accessToken, tokens.refreshToken);

      toast.success('Account created successfully!');
      return {
        ...tokens,
        user: resolvedUser,
      };
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || 'Sign up failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
    } catch {
      // ignore
    } finally {
      logout();
      toast.success('Signed out successfully');
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
}