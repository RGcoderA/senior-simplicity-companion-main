
import React, { useState } from 'react';
import { BookOpen, Volume, Pause, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useHealthNews, NewsArticle } from '@/services/newsService';
import { toast as sonnerToast } from 'sonner';

const NewsCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNewsId, setActiveNewsId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Fetch health news using our service
  const { data: newsList, isLoading, error } = useHealthNews();
  
  const handleTextToSpeech = (id: string) => {
    if (activeNewsId === id && isPlaying) {
      setIsPlaying(false);
      setActiveNewsId(null);
      toast({
        title: "Audio stopped",
        description: "Text to speech has been paused.",
      });
    } else {
      setIsPlaying(true);
      setActiveNewsId(id);
      toast({
        title: "Reading aloud",
        description: "Text to speech started.",
      });
    }
  };

  const handleOpenArticle = (article: NewsArticle) => {
    window.open(article.url, '_blank');
    sonnerToast("Opening news article");
  };
  
  if (isLoading) {
    return (
      <div className="elder-card animate-pulse">
        <div className="flex items-center mb-6">
          <div className="bg-companion-orange/10 p-3 rounded-full mr-4">
            <BookOpen size={32} className="text-companion-orange" />
          </div>
          <div>
            <h3 className="text-elder-lg font-semibold text-companion-dark">Today's News</h3>
            <p className="text-elder-base text-gray-600">Loading health stories...</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {[1, 2].map((placeholder) => (
            <div key={placeholder} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="elder-card">
        <div className="flex items-center mb-6">
          <div className="bg-companion-orange/10 p-3 rounded-full mr-4">
            <BookOpen size={32} className="text-companion-orange" />
          </div>
          <div>
            <h3 className="text-elder-lg font-semibold text-companion-dark">Today's News</h3>
            <p className="text-elder-base text-gray-600">Unable to load news</p>
          </div>
        </div>
        <Button 
          className="mt-6 elder-button w-full bg-companion-blue text-white hover:bg-companion-blue/90"
          onClick={() => window.location.href = '/news'}
        >
          See All Health News
        </Button>
      </div>
    );
  }
  
  return (
    <div className="elder-card">
      <div className="flex items-center mb-6">
        <div className="bg-companion-orange/10 p-3 rounded-full mr-4">
          <BookOpen size={32} className="text-companion-orange" />
        </div>
        <div>
          <h3 className="text-elder-lg font-semibold text-companion-dark">Today's News</h3>
          <p className="text-elder-base text-gray-600">Health stories picked for you</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {newsList?.slice(0, 3).map((news) => (
          <div key={news.id} className="border-b border-gray-200 pb-6 last:border-0">
            <h4 className="text-elder-base font-medium text-companion-dark mb-2">{news.title}</h4>
            <p className="text-elder-base text-gray-700 mb-4">{news.summary}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-elder-sm text-gray-600">
                <span className="font-medium">{news.source}</span> • {new Date(news.publishedAt).toLocaleDateString()}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${
                    activeNewsId === news.id && isPlaying 
                      ? 'text-companion-orange' 
                      : 'text-companion-blue'
                  }`}
                  onClick={() => handleTextToSpeech(news.id)}
                >
                  {activeNewsId === news.id && isPlaying ? (
                    <>
                      <Pause size={20} /> Stop
                    </>
                  ) : (
                    <>
                      <Volume size={20} /> Read
                    </>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-companion-blue"
                  onClick={() => handleOpenArticle(news)}
                >
                  <ExternalLink size={20} /> Open
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        className="mt-6 elder-button w-full bg-companion-blue text-white hover:bg-companion-blue/90"
        onClick={() => window.location.href = '/news'}
      >
        See More News
      </Button>
    </div>
  );
};

export default NewsCard;
