'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PieChart,
  Users, 
  Clock, 
  Layers, 
  CreditCard, 
  FileText, 
  Shield, 
  BarChart4, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Settings,
  HelpCircle
} from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <PieChart size={20} />, href: '/' },
    { id: 'summary', label: 'Contract Summary', icon: <Briefcase size={20} />, href: '/summary' },
    { id: 'components', label: 'Components', icon: <Layers size={20} />, href: '/components' },
    { id: 'rolePlayers', label: 'Role Players', icon: <Users size={20} />, href: '/role-players' },
    { id: 'timeline', label: 'Timeline', icon: <Clock size={20} />, href: '/timeline' },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard size={20} />, href: '/transactions' },
    { id: 'documents', label: 'Documents', icon: <FileText size={20} />, href: '/documents' },
    { id: 'claims', label: 'Claims', icon: <Shield size={20} />, href: '/claims' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart4 size={20} />, href: '/analytics' },
    { id: 'communications', label: 'Communications', icon: <MessageSquare size={20} />, href: '/communications' },
  ];

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`bg-background transition-all duration-300 ease-in-out h-screen flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-start'}`}>
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
          M
        </div>
        {!collapsed && <span className="ml-3 font-semibold text-lg">MIP</span>}
      </div>
      
      {/* Toggle Button */}
      <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} p-2`}>
        <button 
          onClick={handleToggleCollapse}
          className="p-1 rounded-md hover:bg-primary/20"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="mt-4 flex-grow">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
                            (pathname === '/' && item.id === 'dashboard') || 
                            (pathname.startsWith(item.href) && item.href !== '/');
            
            return (
              <li key={item.id}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center w-full p-3 rounded-full transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={collapsed ? 'mx-auto' : ''}>{item.icon}</span>
                    {!collapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                  </div>
                </Link>
                {collapsed && (
                  <div className="tooltip hidden group-hover:block absolute left-16 bg-gray-800 text-white p-2 rounded">
                    {item.label}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Bottom Navigation */}
      <div className="mt-auto">
        <ul className="space-y-1 px-2 mb-2">
          <li>
            <button className="flex items-center w-full p-3 rounded-full transition-colors text-muted-foreground hover:bg-primary hover:text-primary-foreground">
              <span className={collapsed ? 'mx-auto' : ''}><Settings size={20} /></span>
              {!collapsed && <span className="ml-3 text-sm font-medium">Settings</span>}
            </button>
          </li>
          <li>
            <button className="flex items-center w-full p-3 rounded-full transition-colors text-muted-foreground hover:bg-primary hover:text-primary-foreground">
              <span className={collapsed ? 'mx-auto' : ''}><HelpCircle size={20} /></span>
              {!collapsed && <span className="ml-3 text-sm font-medium">Help</span>}
            </button>
          </li>
        </ul>
      </div>
      
      {/* User Profile */}
      <div className={`p-4 border-t border-border/5 ${collapsed ? 'items-center justify-center' : ''} flex`}>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
          U
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium text-primary dark:text-primary-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Insurance Agent</p>
          </div>
        )}
      </div>
    </div>
  );
} 