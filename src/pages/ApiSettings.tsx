
import React, { useState, useEffect } from 'react';
import { Key, Save, Trash2, AlertCircle, CheckCircle, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  addedOn: string;
}

const ApiSettings = () => {
  const [newsApiKey, setNewsApiKey] = useState('');
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [healthApiKey, setHealthApiKey] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [savedKeys, setSavedKeys] = useState<ApiKey[]>([]);
  const { toast } = useToast();

  // Load saved API keys from localStorage on component mount
  useEffect(() => {
    const loadSavedKeys = () => {
      const newsKey = localStorage.getItem('news_api_key');
      if (newsKey) setNewsApiKey(newsKey);
      
      const youtubeKey = localStorage.getItem('youtube_api_key');
      if (youtubeKey) setYoutubeApiKey(youtubeKey);
      
      const healthKey = localStorage.getItem('health_api_key');
      if (healthKey) setHealthApiKey(healthKey);
      
      // Load saved keys list
      const savedKeysList = localStorage.getItem('saved_api_keys');
      if (savedKeysList) {
        setSavedKeys(JSON.parse(savedKeysList));
      }
    };
    
    loadSavedKeys();
  }, []);

  const handleSaveApiKey = (name: string, key: string, storageKey: string) => {
    if (!key.trim()) {
      toast({
        title: "Error",
        description: "API key cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the terms of service",
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage
    localStorage.setItem(storageKey, key);
    
    // Add to saved keys list if not already present
    const existingKeyIndex = savedKeys.findIndex(k => k.name === name);
    const newKey: ApiKey = {
      id: existingKeyIndex >= 0 ? savedKeys[existingKeyIndex].id : Date.now().toString(),
      name,
      key: key.substring(0, 4) + '...' + key.substring(key.length - 4),
      isActive: true,
      addedOn: new Date().toISOString()
    };
    
    let updatedKeys;
    if (existingKeyIndex >= 0) {
      updatedKeys = [...savedKeys];
      updatedKeys[existingKeyIndex] = newKey;
    } else {
      updatedKeys = [...savedKeys, newKey];
    }
    
    setSavedKeys(updatedKeys);
    localStorage.setItem('saved_api_keys', JSON.stringify(updatedKeys));
    
    toast({
      title: "API Key Saved",
      description: `${name} API key has been saved successfully`,
    });
  };

  const handleDeleteApiKey = (name: string, storageKey: string) => {
    // Remove from localStorage
    localStorage.removeItem(storageKey);
    
    // Update form state
    if (storageKey === 'news_api_key') setNewsApiKey('');
    if (storageKey === 'youtube_api_key') setYoutubeApiKey('');
    if (storageKey === 'health_api_key') setHealthApiKey('');
    
    // Remove from saved keys list
    const updatedKeys = savedKeys.filter(k => k.name !== name);
    setSavedKeys(updatedKeys);
    localStorage.setItem('saved_api_keys', JSON.stringify(updatedKeys));
    
    toast({
      title: "API Key Removed",
      description: `${name} API key has been removed`,
    });
  };

  const hasAnyKeys = savedKeys.length > 0;

  return (
    <div>
      <h1 className="text-elder-xl font-bold text-companion-dark mb-6">API Settings</h1>
      
      <p className="text-elder-base text-gray-600 mb-6">
        Connect to external services to enhance your Health Companion experience. 
        You can add API keys for news, health data, and YouTube integration.
      </p>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-elder-lg flex items-center gap-2">
              <Key className="text-companion-blue" /> API Keys
            </CardTitle>
            <CardDescription className="text-elder-base">
              Manage your API keys for various services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="newsApiKey" className="text-elder-base">News API Key</Label>
                <div className="flex mt-2">
                  <Input 
                    id="newsApiKey" 
                    value={newsApiKey} 
                    onChange={(e) => setNewsApiKey(e.target.value)}
                    type="password"
                    placeholder="Enter your News API key" 
                    className="elder-input flex-1 mr-2"
                  />
                  <Button 
                    onClick={() => handleSaveApiKey('News API', newsApiKey, 'news_api_key')}
                    className="bg-companion-blue text-white hover:bg-companion-blue/90"
                  >
                    <Save className="mr-2" /> Save
                  </Button>
                </div>
                <p className="text-elder-sm text-gray-500 mt-1">
                  Get your free News API key from <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer" className="text-companion-blue hover:underline">newsapi.org</a>
                </p>
              </div>
              
              <div>
                <Label htmlFor="youtubeApiKey" className="text-elder-base">YouTube API Key</Label>
                <div className="flex mt-2">
                  <Input 
                    id="youtubeApiKey" 
                    value={youtubeApiKey} 
                    onChange={(e) => setYoutubeApiKey(e.target.value)}
                    type="password"
                    placeholder="Enter your YouTube API key" 
                    className="elder-input flex-1 mr-2"
                  />
                  <Button 
                    onClick={() => handleSaveApiKey('YouTube API', youtubeApiKey, 'youtube_api_key')}
                    className="bg-companion-orange text-white hover:bg-companion-orange/90"
                  >
                    <Youtube className="mr-2" /> Save
                  </Button>
                </div>
                <p className="text-elder-sm text-gray-500 mt-1">
                  Get your YouTube API key from <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-companion-blue hover:underline">Google Developer Console</a>
                </p>
              </div>
              
              <div>
                <Label htmlFor="healthApiKey" className="text-elder-base">Health Data API Key</Label>
                <div className="flex mt-2">
                  <Input 
                    id="healthApiKey" 
                    value={healthApiKey} 
                    onChange={(e) => setHealthApiKey(e.target.value)}
                    type="password"
                    placeholder="Enter your Health Data API key" 
                    className="elder-input flex-1 mr-2"
                  />
                  <Button 
                    onClick={() => handleSaveApiKey('Health API', healthApiKey, 'health_api_key')}
                    className="bg-companion-blue text-white hover:bg-companion-blue/90"
                  >
                    <Save className="mr-2" /> Save
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="terms" 
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)} 
                />
                <label
                  htmlFor="terms"
                  className="text-elder-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to securely store and use these API keys for service integration
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {hasAnyKeys && (
          <Card>
            <CardHeader>
              <CardTitle className="text-elder-lg">Saved API Keys</CardTitle>
              <CardDescription className="text-elder-base">
                Your currently saved API keys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-elder-base font-medium">{apiKey.name}</p>
                      <p className="text-elder-sm text-gray-600">{apiKey.key} • Added {new Date(apiKey.addedOn).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        {apiKey.isActive ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500 mr-1" />
                        )}
                        <span className="text-elder-sm">
                          {apiKey.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          let storageKey;
                          if (apiKey.name === 'News API') storageKey = 'news_api_key';
                          else if (apiKey.name === 'YouTube API') storageKey = 'youtube_api_key';
                          else if (apiKey.name === 'Health API') storageKey = 'health_api_key';
                          
                          if (storageKey) {
                            handleDeleteApiKey(apiKey.name, storageKey);
                          }
                        }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-elder-sm text-gray-500">
                Your API keys are stored securely in your browser's local storage. They are not sent to our servers.
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 mt-6">
        <div className="flex items-start">
          <AlertCircle className="text-yellow-500 mr-4" size={24} />
          <div>
            <h3 className="text-elder-base font-medium text-companion-dark">Security Note</h3>
            <p className="text-elder-sm text-gray-600 mt-2">
              Your API keys give access to services on your behalf. Never share them with anyone.
              Health Companion stores these keys only in your device's local storage and does not
              transmit them to our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;
