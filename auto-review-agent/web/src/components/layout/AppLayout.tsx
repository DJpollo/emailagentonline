import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion } from 'motion/react';

const pageTitleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/submit': 'Submit Request',
  '/queue': 'Approval Queue',
  '/my-requests': 'My Requests',
  '/activity': 'Activity Log',
  '/analytics': 'Analytics',
};

export function AppLayout() {
  const location = useLocation();
  const title = pageTitleMap[location.pathname] || 'Auto-Review Agent';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col">
        <Header
          title={title}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />
        <div className="p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet context={{ searchQuery }} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
