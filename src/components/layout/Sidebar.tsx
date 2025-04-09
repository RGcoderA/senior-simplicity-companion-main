
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Pill, Video, BookOpen, Activity, Phone, User, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const menuItems = [
    { icon: Heart, label: 'Dashboard', path: '/' },
    { icon: Pill, label: 'Medications', path: '/medications' },
    { icon: Activity, label: 'Activities', path: '/activities' },
    { icon: Video, label: 'Video Calls', path: '/video-calls' },
    { icon: BookOpen, label: 'News', path: '/news' },
    { icon: Phone, label: 'Help', path: '/help' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'API Settings', path: '/api-settings' },
  ];
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 flex flex-col items-center border-b border-gray-200">
        <div className="relative w-14 h-14 bg-companion-lightBlue rounded-full flex items-center justify-center mb-2">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-companion-blue text-elder-lg font-bold">
              {user?.displayName?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        <p className="text-elder-base font-medium text-companion-dark">
          {user?.displayName || 'User'}
        </p>
        <p className="text-elder-sm text-gray-500 truncate max-w-full">
          {user?.email}
        </p>
      </div>
      
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-elder-base font-semibold text-gray-800">Menu</h2>
      </div>
      
      <nav className="flex-1 px-4 pb-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-4 rounded-lg text-elder-base transition-colors ${
                    isActive 
                      ? 'bg-companion-lightBlue text-companion-blue font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={28} className={isActive ? 'text-companion-blue' : 'text-gray-500'} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-200">
        <Button 
          className="w-full text-companion-dark hover:bg-gray-100" 
          variant="ghost"
          onClick={logout}
        >
          Sign Out
        </Button>
        
        <div className="bg-companion-lightBlue text-companion-blue p-4 rounded-lg mt-4">
          <p className="text-elder-sm font-medium mb-3">Need assistance?</p>
          <button className="elder-button bg-companion-blue text-white w-full hover:bg-companion-blue/90">
            Call Family
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
