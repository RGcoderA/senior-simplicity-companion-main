
import React from 'react';
import { PhoneCall, LifeBuoy, MessageCircle, HelpCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const helpOptions = [
  {
    id: 'emergency',
    title: 'Emergency Help',
    description: 'Contact emergency services immediately',
    icon: PhoneCall,
    buttonText: 'Call 911',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    action: 'emergency'
  },
  {
    id: 'family',
    title: 'Contact Family',
    description: 'Get help from your designated family member',
    icon: PhoneCall,
    buttonText: 'Call Sarah (Daughter)',
    buttonColor: 'bg-companion-blue hover:bg-companion-blue/90',
    action: 'family'
  },
  {
    id: 'support',
    title: 'Technical Support',
    description: 'Get help with using this application',
    icon: LifeBuoy,
    buttonText: 'Contact Support',
    buttonColor: 'bg-companion-orange hover:bg-companion-orange/90',
    action: 'support'
  }
];

const faqItems = [
  {
    question: 'How do I add a new medication reminder?',
    answer: 'Go to the Medications page and tap the "Add Medication" button. Follow the prompts to set up your new medication reminder.'
  },
  {
    question: 'How do I make a video call?',
    answer: 'Go to the Video Calls page, find the person you want to call in your contacts, and tap the video camera icon next to their name.'
  },
  {
    question: 'How do I change the text size?',
    answer: 'Go to Settings by tapping the gear icon in the top right corner, then select "Display" and adjust the text size slider.'
  },
  {
    question: 'How do I connect to my smart device?',
    answer: 'Go to Settings, select "Connected Devices", and follow the instructions to connect your smart device.'
  },
];

const Help = () => {
  const { toast } = useToast();
  
  const handleHelpAction = (action: string, title: string) => {
    if (action === 'emergency') {
      toast({
        title: "Emergency Services",
        description: "Dialing emergency services...",
        variant: "destructive"
      });
    } else if (action === 'family') {
      toast({
        title: "Calling Family",
        description: "Calling Sarah...",
      });
    } else if (action === 'support') {
      toast({
        title: "Technical Support",
        description: "Connecting to support team...",
      });
    }
  };
  
  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">Help & Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {helpOptions.map((option) => {
          const Icon = option.icon;
          
          return (
            <div key={option.id} className="elder-card">
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-4 ${
                  option.id === 'emergency' ? 'bg-red-100' : 'bg-companion-lightBlue'
                }`}>
                  <Icon size={36} className={option.id === 'emergency' ? 'text-red-600' : 'text-companion-blue'} />
                </div>
                <h3 className="text-elder-lg font-semibold text-companion-dark mb-2">{option.title}</h3>
                <p className="text-elder-base text-gray-600 mb-6">{option.description}</p>
                <button 
                  className={`elder-button w-full text-white ${option.buttonColor}`}
                  onClick={() => handleHelpAction(option.action, option.title)}
                >
                  {option.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="elder-card mb-6">
        <div className="flex items-center mb-6">
          <div className="bg-companion-blue/10 p-3 rounded-full mr-4">
            <HelpCircle size={32} className="text-companion-blue" />
          </div>
          <h2 className="text-elder-lg font-semibold text-companion-dark">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
              <h3 className="text-elder-base font-semibold text-companion-dark mb-2">{item.question}</h3>
              <p className="text-elder-base text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="elder-card">
        <div className="flex items-center mb-6">
          <div className="bg-companion-orange/10 p-3 rounded-full mr-4">
            <MessageCircle size={32} className="text-companion-orange" />
          </div>
          <h2 className="text-elder-lg font-semibold text-companion-dark">Additional Help Resources</h2>
        </div>
        
        <div className="space-y-4">
          <a 
            href="#" 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="text-elder-base font-medium text-companion-dark">User Guide</h3>
              <p className="text-elder-sm text-gray-600">View the complete user manual</p>
            </div>
            <ExternalLink size={24} className="text-companion-blue" />
          </a>
          
          <a 
            href="#" 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="text-elder-base font-medium text-companion-dark">Video Tutorials</h3>
              <p className="text-elder-sm text-gray-600">Watch how-to videos</p>
            </div>
            <ExternalLink size={24} className="text-companion-blue" />
          </a>
          
          <a 
            href="#" 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="text-elder-base font-medium text-companion-dark">Community Support</h3>
              <p className="text-elder-sm text-gray-600">Connect with other users</p>
            </div>
            <ExternalLink size={24} className="text-companion-blue" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;
