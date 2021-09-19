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
        router.push({
            pathname: router.basePath,
            query: {
                ...router.query,
                ...dataToSet
            }
        }, undefined, { shallow: true });
        setState(dataToSet);
    };

    return [state, setQuery];
}
