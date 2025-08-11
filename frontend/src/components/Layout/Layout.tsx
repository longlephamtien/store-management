import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`layout-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar-fixed ${isMobile && !sidebarCollapsed ? 'mobile-open' : ''}`}>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        
        {/* Header */}
        <div className="header-fixed">
          <Header onSidebarToggle={toggleSidebar} title={title} />
        </div>

        {/* Main Content - Scrollable */}
        <div className="content-scrollable">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="content-wrapper space-y-8"
          >
            {children}
          </motion.div>
        </div>

        {/* Background Wave Decorations */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-sky-200/30 to-blue-300/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-200/25 to-sky-300/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }}></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-slate-200/15 to-blue-200/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }}></div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
