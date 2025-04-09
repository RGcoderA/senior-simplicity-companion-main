
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Pill, Video, BookOpen, Phone } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Heart, label: 'Home', path: '/' },
    { icon: Pill, label: 'Meds', path: '/medications' },
    { icon: Video, label: 'Calls', path: '/video-calls' },
    { icon: BookOpen, label: 'News', path: '/news' },
    { icon: Phone, label: 'Help', path: '/help' },
  ];
  
  return (
    <footer className="bg-white border-t border-gray-200 py-2 z-10">
      <nav className="container mx-auto">
        <ul className="flex justify-between items-center">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="flex-1 text-center">
                <Link
                  to={item.path}
                  className={`flex flex-col items-center py-2 px-1 ${
                    isActive ? 'text-companion-blue' : 'text-gray-600'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={24} className={isActive ? 'text-companion-blue' : 'text-gray-500'} />
                  <span className="text-elder-sm mt-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
