export interface NewsItem {
    content: any;
    time: string;
    bn: string;
    text: string;
    sno: string;
    title: string;
    url: string;
    summary: string;
}

export interface NewsContextType {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
}
