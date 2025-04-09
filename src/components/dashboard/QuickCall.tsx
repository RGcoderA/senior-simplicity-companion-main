
import React from 'react';
import { Phone, User, Video, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoriteContacts, useContactsSync, hasContactsSync } from '@/services/contactsService';
import { toast } from 'sonner';

const QuickCall = () => {
  const { data: favoriteContacts, isLoading, error } = useFavoriteContacts();
  const { mutate: syncContacts, isPending: isSyncingContacts } = useContactsSync();
  const hasContacts = hasContactsSync();
  
  const handleCallContact = (name: string, isVideo: boolean = false) => {
    toast.success(`${isVideo ? 'Video calling' : 'Calling'} ${name}...`);
  };
  
  const handleSyncContacts = () => {
    syncContacts();
  };
  
  if (isLoading) {
    return (
      <div className="elder-card animate-pulse">
        <div className="flex items-center mb-6">
          <div className="bg-companion-blue/10 p-3 rounded-full mr-4">
            <Phone size={32} className="text-companion-blue" />
          </div>
          <div>
            <h3 className="text-elder-lg font-semibold text-companion-dark">Quick Call</h3>
            <p className="text-elder-base text-gray-600">Loading your contacts...</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="ml-3">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!hasContacts) {
    return (
      <div className="elder-card">
        <div className="flex items-center mb-6">
          <div className="bg-companion-blue/10 p-3 rounded-full mr-4">
            <Phone size={32} className="text-companion-blue" />
          </div>
          <div>
            <h3 className="text-elder-lg font-semibold text-companion-dark">Quick Call</h3>
            <p className="text-elder-base text-gray-600">Connect your phone contacts</p>
          </div>
        </div>
        
        <div className="bg-companion-lightBlue p-4 rounded-lg mb-4">
          <p className="text-elder-base text-companion-dark">
            Connect your phone contacts to quickly call your family and friends.
          </p>
        </div>
        
        <Button 
          className="elder-button w-full bg-companion-blue text-white hover:bg-companion-blue/90"
          onClick={handleSyncContacts}
          disabled={isSyncingContacts}
        >
          {isSyncingContacts ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting Contacts...
            </>
          ) : (
            <>
              <Phone className="mr-2" />
              Connect Contacts
            </>
          )}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="elder-card">
      <div className="flex items-center mb-6">
        <div className="bg-companion-blue/10 p-3 rounded-full mr-4">
          <Phone size={32} className="text-companion-blue" />
        </div>
        <div>
          <h3 className="text-elder-lg font-semibold text-companion-dark">Quick Call</h3>
          <p className="text-elder-base text-gray-600">Your favorite contacts</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {favoriteContacts && favoriteContacts.length > 0 ? (
          favoriteContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {contact.photoUrl ? (
                  <img 
                    src={contact.photoUrl} 
                    alt={contact.name} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                  />
                ) : (
                  <div className="w-12 h-12 bg-companion-blue/10 rounded-full flex items-center justify-center">
                    <User className="text-companion-blue" size={24} />
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-elder-base font-medium text-companion-dark">{contact.name}</p>
                  <p className="text-elder-sm text-gray-600">{contact.relation || 'Contact'}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="w-10 h-10 bg-companion-blue rounded-full flex items-center justify-center text-white"
                  onClick={() => handleCallContact(contact.name)}
                >
                  <Phone size={20} />
                </button>
                <button 
                  className="w-10 h-10 bg-companion-orange rounded-full flex items-center justify-center text-white"
                  onClick={() => handleCallContact(contact.name, true)}
                >
                  <Video size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <User size={40} className="mx-auto text-gray-400 mb-2" />
            <p className="text-elder-base text-companion-dark">No favorite contacts yet</p>
            <p className="text-elder-sm text-gray-600 mt-1">
              Mark contacts as favorites to see them here
            </p>
          </div>
        )}
      </div>
      
      <Button 
        className="mt-6 elder-button w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
        onClick={() => window.location.href = '/video-calls'}
      >
        View All Contacts
      </Button>
    </div>
  );
};

export default QuickCall;
