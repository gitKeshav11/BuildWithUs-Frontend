import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Bell, Shield, Eye, Trash2, Key, Globe, Moon } from 'lucide-react';
import { useState } from 'react';
import { GlowButton } from '../../components/ui/GlowButton';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    profilePublic: true,
    showEmail: false,
    twoFactor: false,
    darkMode: true,
  });

  const toggle = (key: keyof typeof settings) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
      ],
    },
    {
      title: 'Privacy',
      icon: Eye,
      items: [
        { key: 'profilePublic', label: 'Public Profile', desc: 'Allow anyone to view your profile' },
        { key: 'showEmail', label: 'Show Email', desc: 'Display email on your profile' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security' },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-slate-400">Manage your account preferences and security</p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, si) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.1 }}
              className="glass rounded-2xl p-6 border border-blue-500/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                  <section.icon className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-white font-bold">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{item.label}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{item.desc}</div>
                    </div>
                    <button onClick={() => toggle(item.key as keyof typeof settings)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings[item.key as keyof typeof settings] ? 'bg-blue-600' : 'bg-slate-700'
                      }`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        settings[item.key as keyof typeof settings] ? 'translate-x-5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Change Password */}
          <div className="glass rounded-2xl p-6 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                <Key className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-white font-bold">Change Password</h3>
            </div>
            <div className="space-y-3">
              {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                <div key={label}>
                  <label className="block text-sm text-slate-300 mb-1.5">{label}</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full px-4 py-3 glass border border-blue-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 transition-colors" />
                </div>
              ))}
              <GlowButton size="sm">
                <Key className="w-4 h-4" />
                Update Password
              </GlowButton>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass rounded-2xl p-6 border border-red-500/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-red-400 font-bold">Danger Zone</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-4 py-2 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/25 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
