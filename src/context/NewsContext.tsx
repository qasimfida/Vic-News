import React, { createContext, useState, useEffect, ReactNode } from "react";
import { NewsItem, NewsContextType } from "../types/types";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "react-datepicker/dist/date_utils";

const API_URL = process.env.REACT_APP_API_URL;

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsContext = createContext<NewsContextType | undefined>(
  undefined
);

let allTopics: string[] = [];

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tickers, setTickers] = useState<string>("");
  const [topics, setTopics] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [sort, setSort] = useState<"LATEST" | "EARLIEST" | "RELEVANCE">(
    "LATEST"
  );
  const [limit, setLimit] = useState<number>(50);
  const [visibleTopicsIndex, setVisibleTopicsIndex] = useState<number>(3);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [refreshInterval, setRefreshInterval] = useState(() => {
    return Number(localStorage.getItem("refreshInterval")) || 600000; // Load from storage
  });
  
  const [startDate, endDate] = dateRange;
  
  
  const fetchNews = async () => {
    try {
      setLoading(true);

      const apiUrls = [
        `${API_URL}/cPYquBGvvKRmMEaI.json`,
        `${API_URL}/HT0JSFWTWAj9nUz7.json`,
        `${API_URL}/3eGNoAav9HTQVA0T.json`,
        `${API_URL}/ZSur507lWxtcLfZO.json`,
        `${API_URL}/6ucBztHUPyyUBmxj.json`,
      ];

      const responses = await Promise.all(apiUrls.map((url) => fetch(url)));
      const dataArr = await Promise.all(responses.map((res) => res.json()));

      let allNews: NewsItem[] = [];
      let sno = 1;
      dataArr.forEach((data) => {
        if (data && data.items) {
          const formattedNews: NewsItem[] = data.items
            .map((item: any) => {
              const author = item.authors[0]?.name || "Unknown";
              if (author === "@jbartash") return null;

              return {
                sno: sno++,
                text: item.title,
                url: item.url,
                bn: author.replace(/@/g, ""),
                content: item.content_text,
                contentImage: item.image,
                orgUrl: item.url,
                date_published: item.date_published,
                time: new Date(item.date_published).toLocaleTimeString(),
              };
            })
            .filter(Boolean);

          allNews = [...allNews, ...formattedNews];
        }
      });

      setNews(allNews);
      setFilteredNews(allNews);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  // Fetch news on mount and when filters change
  useEffect(() => {
    fetchNews();
  }, [tickers, topics, startDate, endDate, sort, limit]);
  useEffect(() => {
    const storedInterval = Number(localStorage.getItem("refreshInterval")) || 60000;
    setRefreshInterval(storedInterval);
  }, []);


  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setTopics(topic);
  };
  const handleIntervalChange = (value: number) => {
    setRefreshInterval(value);
    localStorage.setItem("refreshInterval", value.toString());
  };
  useEffect(() => {
    fetchNews(); 
    console.log(`Setting refresh interval: ${refreshInterval}ms`);
    const intervalId = setInterval(() => {
      setRefreshInterval(refreshInterval);
      fetchNews();
    }, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshInterval]);
  return (
    <NewsContext.Provider
      value={{
        news: filteredNews.slice(visibleTopicsIndex, visibleTopicsIndex + 17),
        loading,
        error,
        setTickers,
        setTopics,
        setKeywords,
        setDateRange,
        setSort,
        setLimit,
        selectedTopic,
        refreshInterval,
        handleSelectTopic,
        setRefreshInterval:handleIntervalChange, 
        dateRange,
        allTopics,
        visibleTopics: allTopics,
        rankednews: filteredNews,
        handleSearchChange: (searchTerm: string) => {
        },
        setVisibleTopicsIndex,
        loadMoreTopics: () => {
        }
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
