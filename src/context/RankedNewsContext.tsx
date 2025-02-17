import React, { createContext, useState, useEffect, ReactNode } from "react";
import { NewsItem, NewsContextType } from "../types/types";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = process.env.REACT_APP_API_URL;

interface RankedNewsProviderProps {
  children: ReactNode;
}

const mapSourceToShortCode = (source: string): string => {
  const sourceMap: { [key: string]: string } = {
    Benzinga: "BN",
    "Zacks Commentary": "ZC",
    "Yahoo Finance": "YF",
    CNBC: "CN",
    Bloomberg: "BB",
    Forbes: "FB",
    Reuters: "RT",
    MarketWatch: "MW",
    "Business Insider": "BI",
  };
  return sourceMap[source] || "UNK";
};

export const RankedNewsContext = createContext<NewsContextType | undefined>(undefined);

const allTopics = [
  "blockchain", "earnings", "ipo", "mergers_and_acquisitions", "financial_markets",
  "economy_fiscal", "economy_monetary", "economy_macro", "energy_transportation",
  "finance", "life_sciences", "manufacturing", "real_estate", "retail_wholesale", "technology"
];

export const RankedNewsProvider: React.FC<RankedNewsProviderProps> = ({ children }) => {
  const [rankednews, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tickers, setTickers] = useState<string>("AAPL");
  const [topics, setTopics] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [sort, setSort] = useState<"LATEST" | "EARLIEST" | "RELEVANCE">("LATEST");
  const [limit, setLimit] = useState<number>(50);
  const [visibleTopicsIndex, setVisibleTopicsIndex] = useState<number>(0);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [startDate, endDate] = dateRange;

  const loadMoreTopics = () => {
    setVisibleTopicsIndex((prev) => (prev + 17 < rankednews.length ? prev + 17 : 0));
  };
  
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}${month}${day}T0000`;
  };
  const formatTime = (timeString: string): string => {
    const hours = timeString.substring(9, 11);
    const minutes = timeString.substring(11, 13);
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let apiUrl = API_URL || "";
        if (topics) apiUrl += `&topics=${topics}`;
        if (keywords) apiUrl += `&keywords=${keywords}`;
        if (startDate) apiUrl += `&time_from=${formatDate(startDate)}`;
        if (endDate) apiUrl += `&time_to=${formatDate(endDate)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.items) {
           const formattedNews: NewsItem[] = data.items.map((item: any) => ({
                      text: item.title,
                      url: item.url,
                      bn:"BN",
                      content: item.content_text,
                      contentImage: item.image,
                      orgUrl: item.url,
                      time: formatTime(item.date_published),
                    }));
          setNews(formattedNews);
        } else if (data) {
          setError(data.Information);
        } else {
          throw new Error("Failed to fetch API");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [tickers, topics, keywords, startDate, endDate, sort, limit]);

  const handleSearchChange = (searchTerm: string) => {
    setKeywords(searchTerm);
  };

  return (
    <RankedNewsContext.Provider 
    value={{
      rankednews: rankednews.slice(visibleTopicsIndex, visibleTopicsIndex + 3),
      loading,
      error,
      setTickers,
      setTopics,
      setKeywords,
      setDateRange,
      setSort,
      setLimit,
      selectedTopic,
      setSelectedTopic,
      loadMoreTopics,
      dateRange,
      handleSearchChange,
      setVisibleTopicsIndex,
      allTopics,
      visibleTopics: allTopics,
      news: rankednews
    }}
  >
  
    {children}
  
    </RankedNewsContext.Provider>
  );
};
