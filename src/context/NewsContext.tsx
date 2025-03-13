import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { NewsItem, NewsContextType } from "../types/types";
import "react-datepicker/dist/react-datepicker.css";
import { useTimer } from "./TimerContext";

const API_URL = process.env.REACT_APP_API_URL;

const ALLOWED_SOURCES = new Set([
  "@MarketWatch",
  "@WSJ",
  "@FT",
  "@TheEconomist",
  "@Bloomberg",
  "@bloomberg",
  "@business",
  "@BloombergLive",
  "@BloombergAsia",
]);

const ITEMS_PER_PAGE = 17;
const DEFAULT_VISIBLE_TOPICS = 3;
const DEFAULT_LIMIT = 50;
const RANKED_NEWS_LIMIT = 3;

// Utility functions for filtering
const filterByKeyword = (item: NewsItem, keyword: string): boolean => {
  if (!keyword) return true;
  const searchTerm = keyword.toLowerCase();
  return (
    item.text.toLowerCase().includes(searchTerm) ||
    item.content?.toLowerCase().includes(searchTerm) ||
    item.bn.toLowerCase().includes(searchTerm)
  );
};

const filterByTopic = (item: NewsItem, topic: string): boolean => {
  if (!topic) return true;
  return item.bn.toLowerCase().includes(topic.toLowerCase());
};

const applyFilters = (
  news: NewsItem[],
  filters: {
    keywords: string;
    topics: string;
  }
): NewsItem[] => {
  const { keywords, topics } = filters;

  if (!keywords && !topics) {
    return news;
  }

  return news.filter(
    (item) => filterByKeyword(item, keywords) && filterByTopic(item, topics)
  );
};

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsContext = createContext<NewsContextType | undefined>(
  undefined
);

const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

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
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [visibleTopicsIndex, setVisibleTopicsIndex] = useState<number>(
    DEFAULT_VISIBLE_TOPICS
  );
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);

  const { timeLeft, setIntervalValue } = useTimer();
  const [startDate, endDate] = dateRange;
  const initialDataFetched = useRef(false);

  const loadMoreTopics = useCallback(() => {
    const maxIndex = Math.max(0, filteredNews.length - ITEMS_PER_PAGE);
    setVisibleTopicsIndex((prev) => {
      const nextIndex = prev + ITEMS_PER_PAGE;
      return nextIndex >= filteredNews.length ? 0 : nextIndex;
    });
  }, [filteredNews.length]);

  const loadNewerTopics = useCallback(() => {
    setVisibleTopicsIndex((prev) => {
      const nextIndex = prev - ITEMS_PER_PAGE;
      return nextIndex < 0
        ? Math.max(0, filteredNews.length - ITEMS_PER_PAGE)
        : nextIndex;
    });
  }, [filteredNews.length]);

  const fetchNews = useCallback(async () => {
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

      const allNews: NewsItem[] = dataArr.reduce(
        (acc: NewsItem[], data, dataIndex) => {
          if (!data?.items) return acc;

          const formattedNews = data.items
            .filter((item: any) => ALLOWED_SOURCES.has(item.authors[0]?.name))
            .map((item: any) => ({
              sno: "0", // Temporary sno, will be set correctly later
              text: item.title,
              url: item.url,
              bn: item.authors[0]?.name || "Unknown",
              content: item.content_text,
              contentImage: item.image,
              orgUrl: item.url,
              date_published: item.date_published,
              time: formatTime(item.date_published),
            }));

          return [...acc, ...formattedNews];
        },
        []
      );

      // Sort news by date before setting state
      const sortedNews = allNews.sort(
        (a, b) =>
          new Date(b.date_published).getTime() -
          new Date(a.date_published).getTime()
      );

      // Assign correct sno values
      const rankedItems = sortedNews.slice(0, RANKED_NEWS_LIMIT);
      const regularItems = sortedNews.slice(RANKED_NEWS_LIMIT);

      // Set sno 1-3 for ranked items
      rankedItems.forEach((item, index) => {
        item.sno = String(index + 1);
      });

      // Set sno starting from 4 for regular items
      regularItems.forEach((item, index) => {
        item.sno = String(index + RANKED_NEWS_LIMIT + 1);
      });

      const finalNews = [...rankedItems, ...regularItems];
      setNews(finalNews);
      setFilteredNews(finalNews);
      setReload(false);
      initialDataFetched.current = true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and reload only
  useEffect(() => {
    if (!initialDataFetched.current || reload) {
      fetchNews();
    }
  }, [fetchNews, reload]);

  // Combined filter effect
  useEffect(() => {
    if (!initialDataFetched.current) return;

    let filtered = [...news];

    // Apply keyword filter
    if (keywords) {
      filtered = filtered.filter(
        (item) =>
          item.text.toLowerCase().includes(keywords.toLowerCase()) ||
          item.content?.toLowerCase().includes(keywords.toLowerCase()) ||
          item.bn.toLowerCase().includes(keywords.toLowerCase())
      );
    }

    // Apply topic filter
    if (topics) {
      filtered = filtered.filter((item) =>
        item.bn.toLowerCase().includes(topics.toLowerCase())
      );
    }

    // Apply date range filter
    if (startDate || endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date_published);
        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        }
        if (startDate) {
          return itemDate >= startDate;
        }
        if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    }

    // Apply sorting while preserving ranked news order
    const rankedItems = filtered.filter(
      (item) => parseInt(item.sno) <= RANKED_NEWS_LIMIT
    );
    const regularItems = filtered.filter(
      (item) => parseInt(item.sno) > RANKED_NEWS_LIMIT
    );

    switch (sort) {
      case "LATEST":
        regularItems.sort(
          (a, b) =>
            new Date(b.date_published).getTime() -
            new Date(a.date_published).getTime()
        );
        break;
      case "EARLIEST":
        regularItems.sort(
          (a, b) =>
            new Date(a.date_published).getTime() -
            new Date(b.date_published).getTime()
        );
        break;
      case "RELEVANCE":
        if (keywords) {
          regularItems.sort((a, b) => {
            const aScore = a.text.toLowerCase().includes(keywords.toLowerCase())
              ? 1
              : 0;
            const bScore = b.text.toLowerCase().includes(keywords.toLowerCase())
              ? 1
              : 0;
            return bScore - aScore;
          });
        }
        break;
    }

    // Combine ranked and regular items while preserving sno
    filtered = [...rankedItems, ...regularItems];

    setFilteredNews(filtered);
    setVisibleTopicsIndex(0); // Reset pagination when filters change
  }, [news, keywords, topics, startDate, endDate, sort]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === 1000) {
      setReload(true);
      setIntervalValue(600000);
    }
  }, [timeLeft, setIntervalValue]);

  const handleSearchChange = useCallback((searchTerm: string) => {
    setKeywords(searchTerm);
  }, []);

  const handleSelectTopic = useCallback((topic: string) => {
    setSelectedTopic(topic);
    setTopics(topic);
  }, []);

  const allAuthors = useMemo(() => {
    return Array.from(
      new Set(
        news
          .flatMap((item) => item.bn)
          .filter((author) => ALLOWED_SOURCES.has(author))
      )
    );
  }, [news]);

  // Modify rankedNews to ensure it always has sno 1-3
  const rankedNews = useMemo(() => {
    const topNews = news.slice(0, RANKED_NEWS_LIMIT);
    // Ensure ranked news always has sno 1-3
    return topNews.map((item, index) => ({
      ...item,
      sno: String(index + 1),
    }));
  }, [news]);

  // Remove the filteredAndSortedNews memo since we handle everything in the filter effect
  const filteredAndSortedNews = useMemo(() => {
    return applyFilters(news, { keywords, topics });
  }, [news, keywords, topics]);

  // Add pagination info to help with debugging
  const paginationInfo = useMemo(
    () => ({
      totalItems: filteredNews.length,
      currentPage: Math.floor(visibleTopicsIndex / ITEMS_PER_PAGE) + 1,
      totalPages: Math.ceil(filteredNews.length / ITEMS_PER_PAGE),
      itemsPerPage: ITEMS_PER_PAGE,
      startIndex: visibleTopicsIndex,
      endIndex: Math.min(
        visibleTopicsIndex + ITEMS_PER_PAGE,
        filteredNews.length
      ),
    }),
    [filteredNews.length, visibleTopicsIndex]
  );

  // Debug pagination
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Pagination updated:", paginationInfo);
    }
  }, [paginationInfo]);

  const currentPageNews = useMemo(() => {
    return filteredNews.slice(
      visibleTopicsIndex,
      visibleTopicsIndex + ITEMS_PER_PAGE
    );
  }, [filteredNews, visibleTopicsIndex]);

  const contextValue = useMemo(
    () => ({
      news: currentPageNews,
      loading,
      error,
      setTickers,
      setTopics,
      setKeywords,
      setDateRange,
      setSort,
      setLimit,
      selectedTopic,
      handleSelectTopic,
      loadNewerTopics,
      loadMoreTopics,
      dateRange,
      handleSearchChange,
      setVisibleTopicsIndex,
      allTopics: allAuthors,
      visibleTopics: allAuthors,
      rankednews: rankedNews,
      keywords,
      setReload,
      setRankedReload: setReload,
      paginationInfo, // Add pagination info to context
    }),
    [
      currentPageNews,
      visibleTopicsIndex,
      loading,
      error,
      selectedTopic,
      handleSelectTopic,
      loadNewerTopics,
      loadMoreTopics,
      dateRange,
      handleSearchChange,
      allAuthors,
      rankedNews,
      setReload,
      keywords,
      paginationInfo,
    ]
  );

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};
