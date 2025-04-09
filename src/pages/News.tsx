
import React, { useState } from 'react';
import { BookOpen, Volume, Pause, Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useHealthNews, NewsArticle } from '@/services/newsService';
import { toast as sonnerToast } from 'sonner';
import { Button } from '@/components/ui/button';

const newsCategories = ['All', 'Health', 'Wellness', 'Technology', 'Medicine'];

const News = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNewsId, setActiveNewsId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Fetch health news
  const { data: newsList = [], isLoading } = useHealthNews(activeCategory.toLowerCase());
  
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
  
  // Filter news based on search query
  const filteredNews = searchQuery.trim() === '' 
    ? newsList 
    : newsList.filter(news => 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        news.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">Health & Wellness News</h1>
      
      <div className="elder-card mb-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <Input 
            className="elder-input pl-10" 
            placeholder="Search news..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="w-full mb-6 bg-gray-100 p-1 rounded-lg">
            {newsCategories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-elder-base py-3"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3, 4].map((placeholder) => (
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
            ) : filteredNews.length > 0 ? (
              <div className="space-y-6">
                {filteredNews.map((news) => (
                  <div key={news.id} className="border-b border-gray-200 pb-6 last:border-0">
                    {news.imageUrl && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={news.imageUrl} 
                          alt={news.title} 
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            // Replace broken images with placeholder
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    )}
                    
                    <h4 className="text-elder-lg font-medium text-companion-dark mb-2">{news.title}</h4>
                    <p className="text-elder-base text-gray-700 mb-4">{news.summary}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-elder-sm text-gray-600">
                        <span className="font-medium">{news.source}</span> • {new Date(news.publishedAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            activeNewsId === news.id && isPlaying 
                              ? 'text-companion-orange bg-companion-orange/10' 
                              : 'text-companion-blue bg-companion-blue/10'
                          }`}
                          onClick={() => handleTextToSpeech(news.id)}
                        >
                          {activeNewsId === news.id && isPlaying ? (
                            <>
                              <Pause size={20} /> Stop Reading
                            </>
                          ) : (
                            <>
                              <Volume size={20} /> Read Aloud
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 p-2 rounded-lg text-companion-orange bg-companion-orange/10"
                          onClick={() => handleOpenArticle(news)}
                        >
                          <ExternalLink size={20} /> Open Article
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-elder-lg font-medium text-companion-dark mb-2">No news found</h3>
                <p className="text-elder-base text-gray-600">
                  {searchQuery ? "Try different search terms" : "No news available in this category"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-companion-lightBlue p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-elder-lg font-semibold text-companion-blue mb-2">Premium Health Content</h3>
            <p className="text-elder-base text-companion-dark">
              Upgrade for personalized health insights and video content
            </p>
          </div>
          <Button className="elder-button bg-companion-blue text-white hover:bg-companion-blue/90">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default News;
