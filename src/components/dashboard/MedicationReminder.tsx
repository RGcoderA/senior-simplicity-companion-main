
import React from 'react';
import { Pill, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MedicationReminder = () => {
  const { toast } = useToast();
  
  const handleTake = () => {
    toast({
      title: "Medication taken",
      description: "Great job! We've recorded your medication.",
    });
  };
  
  const handleSnooze = () => {
    toast({
      title: "Reminder snoozed",
      description: "We'll remind you again in 30 minutes.",
    });
  };
  
  return (
    <div className="elder-card border-l-4 border-l-companion-orange bg-white mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="bg-companion-orange/10 p-3 rounded-full mr-4">
            <Pill size={32} className="text-companion-orange" />
          </div>
          <div>
            <h3 className="text-elder-lg font-semibold text-companion-dark">Medication Reminder</h3>
            <p className="text-elder-base text-gray-600">Time to take your blood pressure pill</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <X size={24} />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
      
      <div className="flex gap-4 mt-6">
        <Button 
          className="elder-button flex-1 bg-companion-blue text-white hover:bg-companion-blue/90"
          onClick={handleTake}
        >
          Take Now
        </Button>
        <Button 
          variant="outline" 
          className="elder-button flex-1 border-companion-blue text-companion-blue hover:bg-companion-blue/10"
          onClick={handleSnooze}
        >
          <Bell className="mr-2 h-5 w-5" />
          Remind Later
        </Button>
      </div>
      
      <div className="mt-4 flex items-center text-elder-sm text-gray-600">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-soft mr-2"></div>
        <span>Connected to Google Home</span>
      </div>
    </div>
  );
};

export default MedicationReminder;
