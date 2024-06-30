import {useEffect, useState} from "react";

export default function useFetch<T>(input: RequestInfo | URL, options: RequestInit = {}) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
        refetch()
    }, []);
    const refetch = async () => {
        setData(null);
        setIsLoading(true);
        setIsError(false);
        return fetch<T>(input, options)
            .then(res => res.json())
            .then(res => setData(res))
            .catch(isError => setIsError(true))
            .finally(() => {
                setIsLoading(false);
            })
    }

    return {
        isLoading, isError, data, refetch
    }
}