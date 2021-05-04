import {useEffect, useState} from "react";
import HttpClient from "./httpClient";

export function useFetch<T>(url: string) {
    const [data, saveData] = useState<T | null>(null);
    useEffect(() => {
        (async function getProposals() {
            try {
                const data = await HttpClient.get<T>(url);
                saveData(data);
            } catch (err) {
                console.error(err);
            }
        })()
    }, [url])
    return data;
}