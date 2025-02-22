import React, { createContext, useState, useEffect, ReactNode } from "react";
import { NewsItem, NewsContextType } from "../types/types";
import "react-datepicker/dist/react-datepicker.css";

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
  const [startDate, endDate] = dateRange;

  const loadMoreTopics = () => {
    setVisibleTopicsIndex((prev) => (prev + 17 < news.length ? prev + 17 : 0));
  };

  const loadNewerTopics = () => {
    setVisibleTopicsIndex((prev) => (prev - 17 >= 0 ? prev - 17 : 3));
  };

  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  const handleSearchChange = (searchTerm: string) => {
    setKeywords(searchTerm);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const apiUrls = [
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
            const formattedNews: NewsItem[] = data.items.map(
              (item: any, index: number) => ({
                sno: sno++,
                text: item.title,
                url: item.url,
                bn: item.authors[0]?.name || "Unknown",
                content: item.content_text,
                contentImage: item.image,
                orgUrl: item.url,
                date_published: item.date_published,
                time: formatTime(item.date_published),
              })
            );

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

    fetchNews();
  }, [tickers, topics, startDate, endDate, sort, limit]);

  const allAuthors = new Set(news.flatMap((item) => item.bn));
  allTopics = Array.from(allAuthors);

  useEffect(() => {
    if (!keywords && !topics) {
      setFilteredNews(news);
    } else {
      let filteredItems = news.filter((item) => {
        const matchesKeywords = item.text
          .toLowerCase()
          .includes(keywords.toLowerCase());

        const matchesTopics = item.bn
          .toLowerCase()
          .includes(topics.toLowerCase());

        return matchesKeywords && matchesTopics;
      });

      switch (sort) {
        case "LATEST":
          filteredItems.sort((a, b) => {
            const aDate = new Date(a.date_published);
            const bDate = new Date(b.date_published);
            return bDate.getTime() - aDate.getTime();
          });
          break;
        case "EARLIEST":
          filteredItems.sort((a, b) => {
            const aDate = new Date(a.date_published);
            const bDate = new Date(b.date_published);
            return aDate.getTime() - bDate.getTime();
          });
          break;
        case "RELEVANCE":
          filteredItems.sort((a, b) => {
            const aMatches = a.text
              .toLowerCase()
              .includes(keywords.toLowerCase())
              ? 1
              : 0;
            const bMatches = b.text
              .toLowerCase()
              .includes(keywords.toLowerCase())
              ? 1
              : 0;
            return bMatches - aMatches;
          });
          break;
        default:
          break;
      }

      const emptyItem = {
        content: "",
        time: "",
        bn: "",
        text: "",
        sno: "",
        title: "",
        url: "",
        summary: "",
        orgUrl: "",
        contentImage: "",
      };

      const itemsNeeded = 3;

      if (itemsNeeded > 0) {
        const emptyItems = new Array(itemsNeeded).fill(emptyItem);
        filteredItems = [...emptyItems, ...filteredItems];
      }

      setFilteredNews(filteredItems);
    }
  }, [keywords, news, topics, dateRange, sort]);

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
        setSelectedTopic,
        loadNewerTopics,
        loadMoreTopics,
        dateRange,
        handleSearchChange,
        setVisibleTopicsIndex,
        allTopics,
        visibleTopics: allTopics,
        rankednews: filteredNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
