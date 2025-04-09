
import React from 'react';
import { Video, Phone, MessageCircle, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const contactsList = [
  { id: 1, name: 'Sarah Johnson', relation: 'Daughter', image: '/placeholder.svg', favorite: true },
  { id: 2, name: 'Dr. Anderson', relation: 'Primary Doctor', image: '/placeholder.svg', favorite: true },
  { id: 3, name: 'Mark Wilson', relation: 'Son', image: '/placeholder.svg', favorite: true },
  { id: 4, name: 'Emma Peterson', relation: 'Granddaughter', image: '/placeholder.svg', favorite: false },
  { id: 5, name: 'Robert Chang', relation: 'Neighbor', image: '/placeholder.svg', favorite: false },
];

const VideoCalls = () => {
  const { toast } = useToast();
  
  const handleCall = (name: string, type: string) => {
    toast({
      title: `Calling ${name}`,
      description: `Starting ${type} call...`,
    });
  };
  
  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">Video Calls</h1>
      
      <div className="elder-card mb-6">
        <h2 className="text-elder-lg font-semibold text-companion-dark mb-4">Favorite Contacts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactsList.filter(c => c.favorite).map((contact) => (
            <div key={contact.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <Avatar className="h-16 w-16 mr-4 border-2 border-gray-200">
                  <AvatarImage src={contact.image} alt={contact.name} />
                  <AvatarFallback className="text-elder-base">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-elder-base font-medium text-companion-dark">{contact.name}</h3>
                  <p className="text-elder-sm text-gray-600">{contact.relation}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <button 
                  className="elder-button py-3 bg-companion-blue text-white hover:bg-companion-blue/90 flex flex-col items-center justify-center"
                  onClick={() => handleCall(contact.name, 'video')}
                  aria-label={`Video call ${contact.name}`}
                >
                  <Video size={24} />
                  <span className="text-elder-sm mt-1">Video</span>
                </button>
                <button 
                  className="elder-button py-3 bg-companion-orange text-white hover:bg-companion-orange/90 flex flex-col items-center justify-center"
                  onClick={() => handleCall(contact.name, 'voice')}
                  aria-label={`Voice call ${contact.name}`}
                >
                  <Phone size={24} />
                  <span className="text-elder-sm mt-1">Voice</span>
                </button>
                <button 
                  className="elder-button py-3 bg-gray-600 text-white hover:bg-gray-700 flex flex-col items-center justify-center"
                  onClick={() => handleCall(contact.name, 'message')}
                  aria-label={`Message ${contact.name}`}
                >
                  <MessageCircle size={24} />
                  <span className="text-elder-sm mt-1">Text</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="elder-card">
        <h2 className="text-elder-lg font-semibold text-companion-dark mb-4">All Contacts</h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <Input className="elder-input pl-10" placeholder="Search contacts..." />
        </div>
        
        <div className="space-y-4">
          {contactsList.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Avatar className="h-14 w-14 mr-4 border-2 border-gray-200">
                  <AvatarImage src={contact.image} alt={contact.name} />
                  <AvatarFallback className="text-elder-base">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-elder-base font-medium text-companion-dark">{contact.name}</h4>
                  <p className="text-elder-sm text-gray-600">{contact.relation}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="p-3 bg-companion-blue rounded-full text-white hover:bg-companion-blue/90 transition-colors"
                  onClick={() => handleCall(contact.name, 'video')}
                  aria-label={`Video call ${contact.name}`}
                >
                  <Video size={24} />
                </button>
                <button 
                  className="p-3 bg-companion-orange rounded-full text-white hover:bg-companion-orange/90 transition-colors"
                  onClick={() => handleCall(contact.name, 'voice')}
                  aria-label={`Phone call ${contact.name}`}
                >
                  <Phone size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCalls;
