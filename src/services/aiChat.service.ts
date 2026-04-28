import apiClient from '../lib/axios';
import type { ChatConversation, ChatMessage } from '../types';

type PagedConversations = {
  content?: ChatConversation[];
  data?: ChatConversation[];
};

function normalizeConversations(payload: unknown): ChatConversation[] {
  const value = payload as ChatConversation[] | PagedConversations;

  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.content)) return value.content;
  if (Array.isArray(value?.data)) return value.data;

  return [];
}

export const aiChatService = {
  getConversations: async (): Promise<ChatConversation[]> => {
    const res = await apiClient.get('/ai/chat/conversations');
    return normalizeConversations(res.data);
  },

  getConversation: async (id: string): Promise<ChatConversation> => {
    const res = await apiClient.get(`/ai/chat/conversations/${id}`);
    return res.data;
  },

  createConversation: async (title: string): Promise<ChatConversation> => {
    const res = await apiClient.post('/ai/chat/conversations', { title });
    return res.data;
  },

  sendMessage: async (
    conversationId: string,
    message: string
  ): Promise<ChatMessage> => {
    const res = await apiClient.post(
      `/ai/chat/conversations/${conversationId}/messages`,
      { message }
    );
    return res.data;
  },

  deleteConversation: async (id: string): Promise<void> => {
    await apiClient.delete(`/ai/chat/conversations/${id}`);
  },
};

export default aiChatService;