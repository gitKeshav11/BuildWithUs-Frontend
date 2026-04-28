import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/auth.service';
import { profileService } from '../services/profile.service';
import { toast } from 'sonner';

export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const run = async () => {
      const token = searchParams.get('token');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');

      if (error || !token || !refreshToken) {
        authService.clearAuthStorage();
        toast.error(error || 'OAuth callback data is missing.');
        navigate('/auth/sign-in', { replace: true });
        return;
      }

      try {
        authService.saveTokens(token, refreshToken);

        const user = await authService.getMe();

        // IMPORTANT: this creates developer profile in backend if missing
        await profileService.getMyProfile();

        setAuth(user, token, refreshToken);
        localStorage.setItem('bwu_user', JSON.stringify(user));

        toast.success('Signed in successfully!');
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('OAuth login complete error:', err);
        authService.clearAuthStorage();

        toast.error('Failed to complete OAuth login.');
        navigate('/auth/sign-in', { replace: true });
      }
    };

    run();
  }, [navigate, searchParams, setAuth]);

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
          <svg
            className="animate-spin h-8 w-8 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>

        <p className="text-white font-semibold">Completing sign in...</p>
        <p className="text-slate-400 text-sm mt-2">Please wait</p>
      </div>
    </div>
  );
}