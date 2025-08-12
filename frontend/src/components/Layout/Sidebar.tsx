import React, { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  TrendingUp,
  DollarSign,
  BarChart3,
  Settings,
  Menu,
  X,
  Home,
  FileText,
  Users,
  ShoppingCart,
  PieChart,
  Calendar,
  Bell,
  Search
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarItem {
  id: string;
  labelKey: string; // Changed from label to labelKey
  icon: React.ElementType;
  path: string;
  badge?: number;
  submenu?: Array<{
    id: string;
    labelKey: string; // Changed from label to labelKey
    path: string;
    icon?: React.ElementType;
  }>;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    labelKey: 'dashboard',
    icon: Home,
    path: '/',
  },
  {
    id: 'inventory',
    labelKey: 'inventory',
    icon: Package,
    path: '/inventory',
    badge: 12,
    submenu: [
      { id: 'products', labelKey: 'products', path: '/inventory/products', icon: Package },
      { id: 'categories', labelKey: 'categories', path: '/inventory/categories', icon: FileText },
      { id: 'stock-in', labelKey: 'stock_in', path: '/inventory/stock-in', icon: TrendingUp },
      { id: 'stock-out', labelKey: 'stock_out', path: '/inventory/stock-out', icon: ShoppingCart },
    ],
  },
  {
    id: 'transactions',
    labelKey: 'transactions',
    icon: DollarSign,
    path: '/transactions',
    submenu: [
      { id: 'sales', labelKey: 'sales', path: '/transactions/sales', icon: DollarSign },
      { id: 'purchases', labelKey: 'purchases', path: '/transactions/purchases', icon: ShoppingCart },
      { id: 'payments', labelKey: 'payments', path: '/transactions/payments', icon: FileText },
    ],
  },
  {
    id: 'analytics',
    labelKey: 'analytics',
    icon: BarChart3,
    path: '/analytics',
    submenu: [
      { id: 'revenue', labelKey: 'revenue', path: '/analytics/revenue', icon: PieChart },
      { id: 'performance', labelKey: 'performance', path: '/analytics/performance', icon: TrendingUp },
      { id: 'reports', labelKey: 'reports', path: '/analytics/reports', icon: FileText },
    ],
  },
  {
    id: 'customers',
    labelKey: 'customers',
    icon: Users,
    path: '/customers',
  },
  {
    id: 'calendar',
    labelKey: 'calendar',
    icon: Calendar,
    path: '/calendar',
  },
  {
    id: 'settings',
    labelKey: 'settings',
    icon: Settings,
    path: '/settings',
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['inventory']);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="glass-sidebar h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/15">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-800">{t('store_manager')}</h1>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={onToggle}
          className="glass-button p-2 rounded-lg text-slate-700 hover:text-slate-900 transition-colors"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full pl-10 pr-4 py-2 glass-panel rounded-lg text-slate-700 placeholder-slate-500 border-0 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <div>
                <Link
                  to={item.path}
                  className={clsx(
                    'flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 group',
                    isActive(item.path)
                      ? 'bg-white/30 text-slate-800 shadow-lg border border-white/40'
                      : 'text-slate-700 hover:bg-white/20 hover:text-slate-800'
                  )}
                  onClick={() => item.submenu && toggleExpanded(item.id)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={clsx(
                      'w-5 h-5 transition-colors',
                      isActive(item.path) ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-800'
                    )} />
                    
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="font-medium"
                        >
                          {t(item.labelKey)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {!isCollapsed && (
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className="bg-gradient-warning text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.submenu && (
                        <motion.div
                          animate={{ rotate: expandedItems.includes(item.id) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <TrendingUp className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  )}
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && expandedItems.includes(item.id) && !isCollapsed && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-2 space-y-1 overflow-hidden"
                    >
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.path}
                            className={clsx(
                              'flex items-center space-x-3 p-2 rounded-lg transition-all duration-200',
                              isActive(subItem.path)
                                ? 'bg-white/25 text-slate-800'
                                : 'text-slate-600 hover:bg-white/15 hover:text-slate-800'
                            )}
                          >
                            {subItem.icon && <subItem.icon className="w-4 h-4" />}
                            <span className="text-sm">{t(subItem.labelKey)}</span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/15">
          <div className="flex items-center space-x-3 p-3 glass-card rounded-lg">
            <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-slate-800 font-medium">{t('john_doe')}</p>
              <p className="text-slate-600 text-sm">{t('store_manager_role')}</p>
            </div>
            <Bell className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      )}
    </motion.aside>
  );
}
