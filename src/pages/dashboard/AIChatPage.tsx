import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import {
  Bot,
  Send,
  Plus,
  Trash2,
  MessageSquare,
  Sparkles,
  User,
} from 'lucide-react';
import { aiChatService } from '../../services/aiChat.service';
import { toast } from 'sonner';
import type { ChatConversation, ChatMessage } from '../../types';

const SUGGESTED_PROMPTS = [
  { icon: '🚀', text: 'Give me a startup idea for 2025' },
  { icon: '💻', text: 'Suggest a tech stack for a SaaS app' },
  { icon: '💼', text: 'How do I prepare for a senior dev interview?' },
  { icon: '⚡', text: 'Give me a hackathon project idea' },
  { icon: '🤔', text: 'Review my system architecture' },
  { icon: '📊', text: 'Best practices for API design' },
];

function normalizeId(id: string | number): string {
  return String(id);
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'USER';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-600' : 'bg-purple-600/30 border border-purple-500/30'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-purple-400" />
        )}
      </div>

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-sm'
            : 'glass border border-purple-500/20 text-slate-200 rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

export function AIChatPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadConversations = async () => {
    setLoadingConversations(true);

    try {
      const data = await aiChatService.getConversations();
      setConversations(data || []);
    } catch (error) {
      toast.error('Failed to load conversations');
    } finally {
      setLoadingConversations(false);
    }
  };

  const loadConversation = async (id: string) => {
    try {
      const conversation = await aiChatService.getConversation(id);
      const conversationId = normalizeId(conversation.id);

      setActiveId(conversationId);
      setMessages(conversation.messages || []);
    } catch {
      toast.error('Failed to load conversation');
    }
  };

  const createConversation = async () => {
    try {
      const newConv = await aiChatService.createConversation('New Chat');
      const newConvId = normalizeId(newConv.id);

      setConversations((prev) => {
        const exists = prev.some((conv) => normalizeId(conv.id) === newConvId);
        return exists ? prev : [newConv, ...prev];
      });

      setActiveId(newConvId);
      setMessages(newConv.messages || []);

      return {
        ...newConv,
        id: newConvId,
      } as ChatConversation;
    } catch {
      toast.error('Failed to create conversation');
      return null;
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await aiChatService.deleteConversation(id);

      setConversations((prev) =>
        prev.filter((conv) => normalizeId(conv.id) !== id)
      );

      if (activeId === id) {
        setActiveId(null);
        setMessages([]);
      }
    } catch {
      toast.error('Failed to delete conversation');
    }
  };

  const updateConversationInList = (updatedConversation: ChatConversation) => {
    const updatedId = normalizeId(updatedConversation.id);

    setConversations((prev) => {
      const exists = prev.some((conv) => normalizeId(conv.id) === updatedId);

      if (!exists) {
        return [updatedConversation, ...prev];
      }

      return prev.map((conv) =>
        normalizeId(conv.id) === updatedId ? updatedConversation : conv
      );
    });
  };

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent || loading) return;

    let conversationId = activeId;

    if (!conversationId) {
      const newConversation = await createConversation();
      if (!newConversation) return;
      conversationId = normalizeId(newConversation.id);
    }

    const userMsg: ChatMessage = {
      id: `local-${Date.now()}`,
      role: 'USER',
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const aiReply = await aiChatService.sendMessage(conversationId, trimmedContent);

      if (!aiReply || !aiReply.content) {
        throw new Error('Invalid AI response');
      }

      setMessages((prev) => [...prev, aiReply]);

      try {
        const updatedConversation = await aiChatService.getConversation(conversationId);
        updateConversationInList(updatedConversation);
      } catch {
        // Message already shown, so don't fail UI if conversation refresh fails
      }
    } catch (error) {
      toast.error('Failed to send message');
      setMessages((prev) => prev.filter((msg) => msg.id !== userMsg.id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-blue-500/10 flex flex-col p-4 space-y-3 overflow-y-auto scrollbar-hide">
          <button
            onClick={createConversation}
            disabled={loading}
            className="flex items-center gap-2 w-full px-4 py-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-600/30 transition-colors font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>

          <div className="space-y-1">
            {loadingConversations && (
              <p className="text-xs text-slate-500 px-2 py-2">Loading chats...</p>
            )}

            {!loadingConversations && conversations.length === 0 && (
              <p className="text-xs text-slate-500 px-2 py-2">
                No chats yet. Start a new conversation.
              </p>
            )}

            {conversations.map((conv) => {
              const convId = normalizeId(conv.id);

              return (
                <button
                  key={convId}
                  onClick={() => loadConversation(convId)}
                  className={`w-full text-left flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors group ${
                    activeId === convId
                      ? 'bg-blue-600/15 text-white border border-blue-500/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{conv.title || 'New Chat'}</span>
                  </div>

                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(convId);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                        deleteConversation(convId);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-blue-500/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>

            <div>
              <h2 className="text-white font-semibold">AI Dev Assistant</h2>
              <p className="text-slate-500 text-xs">
                Always available, always helpful
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-6"
                >
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2">
                  AI Dev Assistant
                </h3>

                <p className="text-slate-400 text-center mb-8 max-w-sm">
                  Your personal AI developer companion. Ask me anything about code,
                  architecture, career, or ideas.
                </p>

                <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <motion.button
                      key={prompt.text}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(prompt.text)}
                      disabled={loading}
                      className="flex items-center gap-3 p-4 glass rounded-xl border border-blue-500/20 hover:border-blue-400/40 text-left transition-all group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="text-xl">{prompt.icon}</span>
                      <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                        {prompt.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-400" />
                    </div>

                    <div className="glass border border-purple-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-purple-400"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.8,
                              delay: i * 0.15,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-blue-500/10">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask me anything about development..."
                disabled={loading}
                className="flex-1 px-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors disabled:opacity-60"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="px-4 py-3 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}