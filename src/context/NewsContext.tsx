import React, { createContext, useState, useEffect, ReactNode } from "react";
import { NewsItem, NewsContextType } from "../types/types";
import { time } from "console";

const API_KEY = process.env.REACT_APP_API_KEY;

const API_URL = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&limit=19&tickers=AAPL&apikey=${API_KEY}`;

export const NewsContext = createContext<NewsContextType | undefined>(
  undefined
);

interface NewsProviderProps {
  children: ReactNode;
}
const mapSourceToShortCode = (source: string): string => {
    const sourceMap: { [key: string]: string } = {
        "Benzinga": "BN",
        "Zacks Commentary": "ZC",
        "Yahoo Finance": "YF",
        "CNBC": "CN",
        "Bloomberg": "BB",
        "Forbes": "FB",
        "Reuters": "RT",
        "MarketWatch": "MW",
        "Business Insider": "BI",
    };

    return sourceMap[source] || "UNK"; // Default to "UNK" if not found
};
export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const formatTime = (timeString: string): string => {
    const hours = timeString.substring(9, 11);
    const minutes = timeString.substring(11, 13);
    return `${hours}:${minutes}`;
  };


  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && data.feed) {
          const formattedNews: NewsItem[] = data.feed.map((item: any) => ({
            text: item.title,
            url: item.url,
            bn: mapSourceToShortCode(item?.source),
            content: item.summary,
            time: formatTime(item.time_published),
          }));
          setNews(formattedNews);
        } else {
          throw new Error("Failed to fetch news");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error }}>
      {children}
    </NewsContext.Provider>
  );
};
