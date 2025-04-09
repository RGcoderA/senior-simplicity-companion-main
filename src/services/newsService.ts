
import { useQuery } from "@tanstack/react-query";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
}

// Free health news API endpoint
const HEALTH_NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

// This would be retrieved from API settings in a real implementation
const getApiKey = () => {
  return localStorage.getItem("news_api_key") || "";
};

export const fetchHealthNews = async (category: string = "health"): Promise<NewsArticle[]> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      console.log("No API key found for news");
      return mockHealthNews;
    }
    
    const response = await fetch(`${HEALTH_NEWS_API_URL}?category=${category}&apiKey=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the response to match our NewsArticle interface
    return data.articles.map((article: any, index: number) => ({
      id: `${index}-${Date.now()}`,
      title: article.title,
      summary: article.description || "No description available",
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      imageUrl: article.urlToImage,
      category: category
    }));
  } catch (error) {
    console.error("Error fetching health news:", error);
    // Return mock data as fallback
    return mockHealthNews;
  }
};

export const useHealthNews = (category: string = "health") => {
  return useQuery({
    queryKey: ["healthNews", category],
    queryFn: () => fetchHealthNews(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mock data as fallback if API key is not available
const mockHealthNews: NewsArticle[] = [
  {
    id: "1",
    title: "New Health Guidelines for Seniors Released",
    summary: "The Health Department has released new guidelines specifically for seniors to maintain better health during changing seasons.",
    url: "https://example.com/health-guidelines",
    source: "Health Times",
    publishedAt: "2025-04-09T10:30:00Z",
    category: "health"
  },
  {
    id: "2",
    title: "Community Center Hosting Free Exercise Classes",
    summary: "The local community center will offer free exercise classes designed for seniors starting next week.",
    url: "https://example.com/exercise-classes",
    source: "Community News",
    publishedAt: "2025-04-09T08:45:00Z",
    category: "wellness"
  },
  {
    id: "3",
    title: "Tips for Better Sleep as You Age",
    summary: "Experts share advice on how to improve sleep quality, especially important for adults over 65.",
    url: "https://example.com/sleep-tips",
    source: "Wellness Today",
    publishedAt: "2025-04-08T14:20:00Z",
    category: "wellness"
  },
  {
    id: "4",
    title: "How Technology is Making Life Easier for Seniors",
    summary: "New applications and devices are being designed with seniors in mind, focusing on accessibility and ease of use.",
    url: "https://example.com/tech-seniors",
    source: "Tech Review",
    publishedAt: "2025-04-07T16:15:00Z",
    category: "technology"
  },
];
