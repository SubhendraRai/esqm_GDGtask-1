import React from 'react';
import { Role, User } from '../types';
import { Button } from './Button';

interface LayoutProps {
  user: User | null;
  children: React.ReactNode;
  onLogout: () => void;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ user, children, onLogout, title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/80">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <div className="flex-shrink-0">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/2/2d/Galgotias_University_logo.png" 
                  alt="Galgotias University" 
                  className="h-12 w-auto object-contain"
                />
             </div>
             <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none uppercase font-serif">Galgotias University</h1>
                <p className="text-xs text-red-600 font-bold tracking-wider mt-0.5">ERP SERVICE PORTAL</p>
             </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm text-gray-900 font-medium">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {user?.role === Role.STAFF ? 'Staff Faculty' : 'Student'}
              </span>
            </div>
            <img 
              src={user?.avatar} 
              alt="Profile" 
              className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300" 
            />
            <Button variant="ghost" size="sm" onClick={onLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="mb-6">
           <h2 className="text-2xl font-bold text-gray-800 font-serif">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
};