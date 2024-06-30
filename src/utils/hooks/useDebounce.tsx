import {useEffect, useRef, useState} from "react";

export default function useDebounce<T>(value, timeout = 1000) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const timeoutRef = useRef<number | null>(null);
    useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, timeout);
        return () => clearTimeout(timeoutRef.current);
    }, [value, timeout])

    return debouncedValue;
}