
import React from 'react';
import { Pill, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const medicationList = [
  { id: 1, name: 'Lisinopril', dose: '10mg', time: '8:00 AM', taken: true },
  { id: 2, name: 'Metformin', dose: '500mg', time: '12:00 PM', taken: false },
  { id: 3, name: 'Vitamin D', dose: '1000 IU', time: '8:00 PM', taken: false },
];

const Medications = () => {
  const { toast } = useToast();
  
  const handleTakeMedication = (id: number, name: string) => {
    toast({
      title: "Medication taken",
      description: `You've marked ${name} as taken.`,
    });
  };
  
  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">Your Medications</h1>
      
      <div className="elder-card mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-companion-blue/10 p-3 rounded-full mr-4">
            <Clock size={32} className="text-companion-blue" />
          </div>
          <div>
            <h2 className="text-elder-lg font-semibold text-companion-dark">Today's Schedule</h2>
            <p className="text-elder-base text-gray-600">Your medication for the day</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {medicationList.map((med) => (
            <div 
              key={med.id} 
              className={`p-4 rounded-lg flex items-center justify-between ${
                med.taken ? 'bg-gray-100' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${
                  med.taken ? 'bg-green-100' : 'bg-companion-orange/10'
                }`}>
                  <Pill size={24} className={med.taken ? 'text-green-500' : 'text-companion-orange'} />
                </div>
                <div>
                  <h3 className="text-elder-base font-medium text-companion-dark">{med.name}</h3>
                  <p className="text-elder-sm text-gray-600">{med.dose} • {med.time}</p>
                </div>
              </div>
              
              {med.taken ? (
                <span className="text-green-500 text-elder-base font-medium">Taken</span>
              ) : (
                <Button 
                  className="elder-button bg-companion-blue text-white hover:bg-companion-blue/90"
                  onClick={() => handleTakeMedication(med.id, med.name)}
                >
                  Take Now
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="elder-card">
        <div className="flex items-center mb-6">
          <div className="bg-companion-orange/10 p-3 rounded-full mr-4">
            <Bell size={32} className="text-companion-orange" />
          </div>
          <div>
            <h2 className="text-elder-lg font-semibold text-companion-dark">Reminder Settings</h2>
            <p className="text-elder-base text-gray-600">Manage your medication alerts</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-elder-base font-medium text-companion-dark">Voice Reminders</h3>
              <p className="text-elder-sm text-gray-600">Enable voice alerts via Google Home</p>
            </div>
            <div className="flex items-center text-green-500">
              <span className="text-elder-base font-medium mr-2">Connected</span>
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse-soft"></div>
            </div>
          </div>
          
          <button className="elder-button w-full bg-companion-orange text-white hover:bg-companion-orange/90">
            Manage Medication Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Medications;
