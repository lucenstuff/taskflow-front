import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LogOut, List, Plus, Settings, Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mocks (reemplaza por tus datos reales)
const tasks = [
  { name: 'Upcoming', icon: <ChevronRight />, count: 12, href: '/upcoming' },
  { name: 'Today', icon: <List />, count: 5, href: '/today', active: true },
];
const lists = [
  { name: 'Personal', color: 'bg-red-400', count: 3, href: '/list/personal' },
  { name: 'Work', color: 'bg-cyan-300', count: 6, href: '/list/work' },
  { name: 'List 1', color: 'bg-yellow-300', count: 3, href: '/list/1' },
];
const tags = [
  { name: 'Tag 1', color: 'bg-cyan-100 text-cyan-900' },
  { name: 'Tag 2', color: 'bg-red-100 text-red-900' },
];

export const Sidebar: React.FC<{
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
  brandName: string;
  onLogout?: () => void;
}> = ({ isMobileMenuOpen, onMobileMenuClose, brandName, onLogout }) => {
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;
  const handleLogout = () => {
    onLogout?.();
    onMobileMenuClose();
  };

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span className="font-semibold text-lg whitespace-nowrap text-primary">{brandName}</span>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>
        )}
      </div>
      <div className="p-4 pb-2">
        <div className="relative">
          <Input placeholder="Search" className="pl-10" />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      <div className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground tracking-widest">TASKS</div>
      <div className="px-2 space-y-1">
        {tasks.map((task) => (
          <Link
            key={task.name}
            to={task.href}
            className={cn(
              'flex items-center px-4 py-2 text-sm rounded-md font-medium',
              isActive(task.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <span className="mr-3">{task.icon}</span>
            <span className="flex-1">{task.name}</span>
            {task.count !== undefined && (
              <span className="ml-2 bg-muted text-xs rounded px-2 py-0.5 font-semibold">{task.count}</span>
            )}
          </Link>
        ))}
      </div>
      <div className="px-4 pt-4 pb-1 text-xs font-semibold text-muted-foreground tracking-widest">LISTS</div>
      <div className="px-2 space-y-1">
        {lists.map((list) => (
          <Link
            key={list.name}
            to={list.href}
            className="flex items-center px-4 py-2 text-sm rounded-md font-medium hover:bg-muted"
          >
            <span className={cn('w-3 h-3 rounded-full mr-3', list.color)} />
            <span className="flex-1">{list.name}</span>
            <span className="ml-2 bg-muted text-xs rounded px-2 py-0.5 font-semibold">{list.count}</span>
          </Link>
        ))}
        <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />Add New List
        </Button>
      </div>
      <div className="px-4 pt-4 pb-1 text-xs font-semibold text-muted-foreground tracking-widest">TAGS</div>
      <div className="px-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag.name} className={cn('px-3 py-1 rounded text-xs font-medium', tag.color)}>{tag.name}</span>
        ))}
        <Button variant="ghost" className="px-3 py-1 rounded text-xs font-medium bg-muted" size="sm">
          + Add Tag
        </Button>
      </div>
      <div className="flex-1" />
      <div className="px-2 pb-2 mt-4">
        <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary mb-1" size="sm">
          <Settings className="w-5 h-5 mr-3" />Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-foreground hover:text-primary" onClick={handleLogout} size="sm">
          <LogOut className="w-5 h-5 mr-3" />Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileMenuClose}
          aria-hidden="true"
        />
      )}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-background transform transition-transform duration-200 ease-in-out lg:hidden',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent onClose={onMobileMenuClose} />
      </div>
      <div className="fixed inset-y-0 left-0 z-30 hidden lg:flex flex-col w-64 bg-background border-r border-border">
        <SidebarContent />
      </div>
    </>
  );
}; 