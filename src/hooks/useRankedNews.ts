import { useContext } from "react";
import { RankedNewsContext } from "../context/RankedNewsContext";
import { NewsContextType } from "../types/types";

const useNews = (): NewsContextType => {
    const context = useContext(RankedNewsContext);
    if (!context) {
        throw new Error("useNews must be used within a NewsProvider");
    }
    return context;
};

export default useNews;
