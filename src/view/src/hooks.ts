import {useEffect, useState} from "react";

export function useFetch(url: string) {
    const [data, saveData] = useState(null);
    useEffect(() => {
        (async function getProposals() {
            try {
                const request: Response = await fetch(url);
                const data = await request.json();
                saveData(data);
            } catch (err) {
                console.error(err);
            }
        })()
    }, [url])
    return data;
}