import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';

/**
 *
 * @returns
 */
export default function useQueryParams(): [
    ParsedUrlQuery,
    (value: Record<string, string>) => void,
] {
    const router = useRouter();
    const [state, setState] = useState(() => router.query);

    const setQuery = (dataToSet: Record<string, string>) => {
        const url = new URL(window.location.toString());
        const urlParam = new URLSearchParams(url.search);

        Object.entries(dataToSet).forEach(([key, value]) => {
            urlParam.set(key, value.toString());
        });

        const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParam.toString()}`;
        window.history.pushState({ path: newurl }, '', newurl);
        setState(dataToSet);
    };

    return [state, setQuery];
}
