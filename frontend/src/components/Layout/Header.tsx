import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Bell,
  Search,
  Settings,
  User,
  ChevronDown,
  Sun,
  LogOut,
  Menu,
  MessageSquare,
  HelpCircle,
  Shield
} from 'lucide-react';
import { clsx } from 'clsx';
import LanguageSwitcher from '../LanguageSwitcher';

interface HeaderProps {
  onSidebarToggle: () => void;
  title?: string;
}

export default function Header({ onSidebarToggle, title }: HeaderProps) {
  const { t } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    {
      id: 1,
      title: t('low_stock_alert'),
      message: t('stock_running_low', { product: 'iPhone 15 Pro', count: 5 }),
      time: t('minutes_ago', { count: 5 }),
      type: 'warning',
      unread: true,
    },
    {
      id: 2,
      title: t('new_sale'),
      message: t('customer_purchased', { product: 'MacBook Pro', amount: '$2,499' }),
      time: t('minutes_ago', { count: 15 }),
      type: 'success',
      unread: true,
    },
    {
      id: 3,
      title: t('monthly_report'),
      message: t('monthly_report_ready'),
      time: t('hour_ago', { count: 1 }),
      type: 'info',
      unread: false,
    },
  ];

  const profileMenuItems = [
    { icon: User, label: t('profile'), action: () => console.log('Profile') },
    { icon: Settings, label: t('settings'), action: () => console.log('Settings') },
    { icon: HelpCircle, label: t('help_center'), action: () => console.log('Help') },
    { icon: Shield, label: t('privacy'), action: () => console.log('Privacy') },
    { icon: LogOut, label: t('logout'), action: () => console.log('Sign out') },
  ];

  return (
    <header className="glass-panel sticky top-0 z-40 h-16 flex items-center justify-between px-6 border-b border-white/20">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onSidebarToggle}
          className="lg:hidden glass-button p-2 rounded-lg text-slate-700 hover:text-slate-900 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title && (
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-semibold text-slate-800"
          >
            {title}
          </motion.h1>
        )}
      </div>

      {/* Center Section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
          <motion.input
            type="text"
            placeholder={t('search_placeholder')}
            className={clsx(
              'w-full pl-10 pr-4 py-2 glass-panel rounded-xl text-slate-700 placeholder-slate-500 border-0 focus:outline-none transition-all duration-300',
              searchFocused
                ? 'ring-2 ring-blue-300/50 bg-white/30'
                : 'focus:ring-2 focus:ring-blue-200/50'
            )}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            whileFocus={{ scale: 1.02 }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button className="glass-button p-2 rounded-lg text-slate-700 hover:text-slate-900 transition-colors">
          <Sun className="w-5 h-5" />
        </button>

        {/* Messages */}
        <button className="glass-button p-2 rounded-lg text-slate-700 hover:text-slate-900 transition-colors relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-warning rounded-full"></span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="glass-button p-2 rounded-lg text-slate-700 hover:text-slate-900 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {notifications.some(n => n.unread) && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-warning rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-12 w-80 glass-panel rounded-xl p-4 z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-800 font-semibold">{t('notifications')}</h3>
                <button className="text-slate-600 hover:text-slate-800 text-sm">
                  {t('mark_all_read')}
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    whileHover={{ scale: 1.02 }}
                    className={clsx(
                      'p-3 rounded-lg border cursor-pointer transition-all',
                      notification.unread
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 border-white/10'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-slate-800 font-medium text-sm">
                          {notification.title}
                        </p>
                        <p className="text-slate-600 text-xs mt-1">
                          {notification.message}
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-gradient-accent rounded-full mt-1"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-center text-slate-600 hover:text-slate-800 text-sm border-t border-slate-300/30 pt-4">
                {t('view_all_notifications')}
              </button>
            </motion.div>
          )}
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 glass-button px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
            <span className="hidden md:block text-sm font-medium">John Doe</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-12 w-56 glass-panel rounded-xl p-2 z-50"
            >
              <div className="px-3 py-2 border-b border-slate-300/30 mb-2">
                <p className="text-slate-800 font-medium">John Doe</p>
                <p className="text-slate-600 text-sm">john.doe@store.com</p>
              </div>
              
              {profileMenuItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  onClick={item.action}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-white/15 transition-all text-left"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
