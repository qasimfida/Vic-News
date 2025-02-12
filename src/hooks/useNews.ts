import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { NewsContextType } from "../types/types";

const useNews = (): NewsContextType => {
    const context = useContext(NewsContext);
    if (!context) {
        throw new Error("useNews must be used within a NewsProvider");
    }
    return context;
};

export default useNews;
