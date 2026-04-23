import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export function Header({ title, searchQuery, onSearchQueryChange }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-20">
      <h2 className="text-xl font-bold text-primary-dark">{title}</h2>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            className="pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue w-64"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-muted hover:text-primary-dark hover:bg-slate-50 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
          </button>

          <button className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-border">
            <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center">
              <User className="w-5 h-5 text-accent-blue" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
