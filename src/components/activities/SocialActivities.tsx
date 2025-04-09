
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';

const affirmations = [
  {
    text: "I am strong and healthy every day.",
    audioUrl: "/affirmations/strong-health.mp3" // This would be a real audio file in production
  },
  {
    text: "I embrace the joy of connecting with others.",
    audioUrl: "/affirmations/connection.mp3"
  },
  {
    text: "My mind is clear and focused.",
    audioUrl: "/affirmations/clear-mind.mp3"
  },
  {
    text: "I am grateful for the people in my life.",
    audioUrl: "/affirmations/gratitude.mp3"
  },
  {
    text: "Today I choose to be happy and positive.",
    audioUrl: "/affirmations/positivity.mp3"
  }
];

const socialEvents = [
  {
    title: "Morning Yoga Group",
    time: "Tuesdays & Thursdays, 9:00 AM",
    location: "Community Center",
    participants: 12
  },
  {
    title: "Book Club Discussion",
    time: "Every Wednesday, 3:00 PM",
    location: "Local Library",
    participants: 8
  },
  {
    title: "Walking Group",
    time: "Daily, 8:00 AM",
    location: "Memorial Park",
    participants: 15
  },
  {
    title: "Art Class",
    time: "Mondays, 2:00 PM",
    location: "Senior Center",
    participants: 10
  }
];

const SocialActivities = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const { isPlaying, togglePlayback, speak } = useAudio();

  const handleNextAffirmation = () => {
    const nextIndex = (currentAffirmation + 1) % affirmations.length;
    setCurrentAffirmation(nextIndex);
    speak(affirmations[nextIndex].text);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-elder-lg font-bold text-companion-dark">
            Daily Affirmation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-companion-lightBlue p-6 rounded-lg text-center">
            <blockquote className="text-elder-lg font-medium text-companion-dark mb-6">
              "{affirmations[currentAffirmation].text}"
            </blockquote>
            
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => speak(affirmations[currentAffirmation].text)}
                className="bg-companion-blue text-white flex items-center gap-2"
              >
                {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                {isPlaying ? "Stop" : "Listen"}
              </Button>
              
              <Button 
                onClick={handleNextAffirmation}
                variant="outline"
              >
                Next Affirmation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-elder-lg font-bold text-companion-dark">
            Community Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialEvents.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-companion-lightBlue/20 transition-colors">
                <h3 className="text-elder-base font-bold text-companion-dark">{event.title}</h3>
                <p className="text-elder-sm text-gray-600 mt-1">{event.time}</p>
                <p className="text-elder-sm text-gray-600">{event.location}</p>
                <p className="text-elder-sm mt-2">{event.participants} participants</p>
                <Button 
                  className="w-full mt-3 bg-companion-blue/10 text-companion-blue hover:bg-companion-blue/20" 
                  variant="outline"
                >
                  Join Group
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialActivities;
