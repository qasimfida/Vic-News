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
  isRanked?: boolean;
}

export interface NewsContextType {
  news: NewsItem[];
  rankednews: NewsItem[];
  loading: boolean;
  keywords: string;
  error: string | null;
  selectedTopic: string;
  handleSelectTopic: (topic: string) => void;
  setTopics: (topics: string) => void;
  setKeywords: any;
  handleSearchChange: (searchTerm: string) => void;
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
  setSort: (sort: "LATEST" | "EARLIEST" | "RELEVANCE") => void;
  visibleTopics: string[];
  setVisibleTopicsIndex: (index: number) => void;
  allTopics: string[];
  setReload: (reload: boolean) => void;
  loadMoreTopics: () => void;
  loadNewerTopics?: () => void;
  setRankedReload: (reload: boolean) => void;
  dateRange: [Date | null, Date | null];
  paginationInfo: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
  };
}

export type ModalKey = "dateSelector" | "topicSelector" | "sortSelector";

export interface ModalContextType {
  openModal: (modal: ModalKey) => void;
  closeModal: (modal: ModalKey) => void;
  isModalOpen: (modal: ModalKey) => boolean;
}