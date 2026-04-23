import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  ListTodo,
  History,
  Activity,
  BarChart3,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Submit Request', path: '/submit', icon: PlusCircle },
  { name: 'Approval Queue', path: '/queue', icon: ListTodo, adminOnly: true },
  { name: 'My Requests', path: '/my-requests', icon: History },
  { name: 'Activity Log', path: '/activity', icon: Activity },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { profile, user, isAdmin, signOut } = useAuth();
  const initials = (profile?.full_name || user?.email || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-blue-900 text-white flex flex-col z-30">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-bold tracking-tight">Auto-Review</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navLinks.filter((link) => !link.adminOnly || isAdmin).map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? 'bg-accent-blue text-white'
                : 'text-blue-100/80 hover:text-white hover:bg-blue-800'}
            `}
          >
            <link.icon className="w-5 h-5" />
            {link.name}
            {link.adminOnly && (
              <span className="ml-auto text-[10px] bg-blue-800 text-blue-100 px-1.5 py-0.5 rounded uppercase font-bold">
                Admin
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{profile?.full_name || user?.email || 'User'}</p>
            <p className="text-xs text-blue-200/70 truncate">{isAdmin ? 'Administrator' : 'Requester'}</p>
          </div>
        </div>
        <button
          onClick={async () => {
            await signOut();
            navigate('/login', { replace: true });
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-blue-100/80 hover:text-white hover:bg-blue-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
