export interface NewsItem {
  content: any;
  time: string;
  bn: string;
  text: string;
  sno: string;
  title: string;
  url: string;
  summary: string;
  date_published: any;
  orgUrl: string;
  contentImage: string;
}

export interface NewsContextType {
  news: NewsItem[];
  rankednews: NewsItem[];
  loading: boolean;

  error: string | null;

  setTickers: (tickers: string) => void;
  selectedTopic: string;
  handleSelectTopic: (topic: string) => void;

  setTopics: (topics: string) => void;

  setKeywords: any;
  handleSearchChange: (searchTerm: string) => void;

  setDateRange: (dateRange: [Date | null, Date | null]) => void;

  setSort: (sort: "LATEST" | "EARLIEST" | "RELEVANCE") => void;

  setLimit: (limit: number) => void;

  visibleTopics: string[];

  setVisibleTopicsIndex: (index: number) => void;

  allTopics: string[];

  loadMoreTopics: () => void;
  loadNewerTopics?: () => void;

  dateRange: [Date | null, Date | null];
}

export type ModalKey = "dateSelector" | "topicSelector" | "sortSelector";

export interface ModalContextType {
  openModal: (modal: ModalKey) => void;
  closeModal: (modal: ModalKey) => void;
  isModalOpen: (modal: ModalKey) => boolean;
}
