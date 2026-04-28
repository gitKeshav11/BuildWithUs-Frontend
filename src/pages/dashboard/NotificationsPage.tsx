import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Bell, Users, Heart, Zap, Award, CheckCheck, Trash2, Shield } from 'lucide-react';
import { formatRelativeTime } from '../../lib/utils';
import type { Notification } from '../../types';
import { notificationsService } from '../../services/notifications.service';

const mockNotifications: Notification[] = [
  { id: '1', type: 'FOLLOW', title: 'New Follower', message: 'Alex Chen started following you', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: '2', type: 'PROJECT_LIKE', title: 'Project Liked', message: 'Sarah Mitchell liked your project "AI Dashboard Builder"', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: '3', type: 'COLLABORATION_REQUEST', title: 'Collaboration Request', message: 'Rahul Sharma wants to collaborate on your project', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: '4', type: 'BADGE_EARNED', title: 'Badge Earned!', message: 'You earned the "Top Builder" badge! 🏆', isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: '5', type: 'VERIFICATION_UPDATE', title: 'Verification Update', message: 'Your verification request is under review', isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: '6', type: 'JOB_ALERT', title: 'New Job Match', message: 'A new Senior React Developer role matches your profile', isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
];

const typeConfig: Record<string, { icon: any; color: string }> = {
  FOLLOW: { icon: Users, color: 'text-blue-400 bg-blue-500/15' },
  PROJECT_LIKE: { icon: Heart, color: 'text-red-400 bg-red-500/15' },
  COLLABORATION_REQUEST: { icon: Zap, color: 'text-cyan-400 bg-cyan-500/15' },
  BADGE_EARNED: { icon: Award, color: 'text-amber-400 bg-amber-500/15' },
  VERIFICATION_UPDATE: { icon: Shield, color: 'text-purple-400 bg-purple-500/15' },
  JOB_ALERT: { icon: Bell, color: 'text-orange-400 bg-orange-500/15' },
  SYSTEM: { icon: Bell, color: 'text-slate-400 bg-slate-500/15' },
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsService.getNotifications();
        setNotifications(data);
      } catch {
        console.error('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    await notificationsService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = async (id: string) => {
    await notificationsService.deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markRead = async (id: string) => {
    await notificationsService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-3 px-2.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">{unreadCount}</span>
              )}
            </h1>
            <p className="text-slate-400">Stay updated with your community activity</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 glass border border-blue-500/20 rounded-xl text-blue-400 hover:text-white text-sm transition-colors">
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </motion.div>

        <div className="space-y-3">
          {notifications.map((notif, i) => {
            const config = typeConfig[notif.type] || typeConfig.SYSTEM;
            return (
              <motion.div key={notif.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-4 p-4 glass rounded-2xl border transition-all group ${
                  !notif.isRead ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-500/10'
                }`}>
                <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0`}>
                  <config.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0" onClick={() => markRead(notif.id)}>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{notif.title}</span>
                    {!notif.isRead && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                  </div>
                  <p className="text-slate-400 text-sm mt-0.5">{notif.message}</p>
                  <p className="text-slate-600 text-xs mt-1">{formatRelativeTime(notif.createdAt)}</p>
                </div>
                <button onClick={() => deleteNotification(notif.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/15 text-slate-500 hover:text-red-400 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}

          {notifications.length === 0 && (
            <div className="text-center py-16">
              <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}