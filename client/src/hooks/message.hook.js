import { useCallback } from "react";
import { toast } from "react-hot-toast";

export const useMessage = () => {
    return useCallback((text, fn) => {
        if (toast && text) fn(text);
    }, []);
};
