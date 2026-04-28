import apiClient from '../lib/axios';

export type VerificationStatus = 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface VerificationStatusResponse {
  status: VerificationStatus;
  reason?: string;
  reviewedAt?: string;
}

export interface VerificationReviewRequest {
  id: string;
  status: 'APPROVED' | 'REJECTED';
  reason?: string;
}

export interface VerificationRequestPayload {
  documentUrl?: string;
  notes?: string;
}

export const verificationService = {
  requestVerification: async (payload?: VerificationRequestPayload): Promise<void> => {
    await apiClient.post('/verification/request', payload ?? {});
  },

  getVerificationStatus: async (): Promise<VerificationStatusResponse> => {
    const response = await apiClient.get('/verification/status');
    return response.data;
  },

  getAllVerifications: async (): Promise<any[]> => {
    const response = await apiClient.get('/verification/pending');
    return response.data?.content ?? response.data ?? [];
  },

  reviewVerification: async ({
    id,
    status,
    reason,
  }: VerificationReviewRequest): Promise<void> => {
    await apiClient.post(`/verification/${id}/review`, {
      status,
      adminNotes: reason,
    });
  },
};

export default verificationService;