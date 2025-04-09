
import React from 'react';
import { Bell, Calendar, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-companion-dark">
                  <Menu size={28} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          <div className="flex items-center gap-2">
            <span className="text-elder-lg font-bold text-companion-blue">Health</span>
            <span className="text-elder-lg font-bold text-companion-orange">Companion</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative text-companion-dark">
            <Bell size={28} />
            <span className="absolute top-1 right-1 w-3 h-3 bg-companion-orange rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-companion-dark">
            <Calendar size={28} />
            <span className="sr-only">Calendar</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
