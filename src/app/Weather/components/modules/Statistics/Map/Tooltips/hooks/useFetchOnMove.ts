import { AnyArgumentsPromiseFunction, AnyType } from 'app/common/types';
import { debounce } from 'lodash';
import { useState, useRef } from 'react';
import { usePromise } from 'react-use';

const DEBOUNCE_TIME = 400;

const useFetchOnMove = <R>(fetcher: AnyArgumentsPromiseFunction<R>) => {
    const [data, setData] = useState<R>();
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(false);
    const mounted = usePromise();

    const fetchOnMove = async (...args: AnyType) => {
        const weatherResponse = await mounted(fetcher(...args).catch(() => {
            if (!error) setError(true);
        }));

        if (weatherResponse) setData(weatherResponse);
        if (error) setError(false);

        setIsloading(false);
    };

    const callFetcherOnMove = useRef(debounce(fetchOnMove, DEBOUNCE_TIME));

    const handleMove = (handleMoveArgs: AnyType) => {
        if (!isLoading) { setIsloading(true); }
        callFetcherOnMove.current(handleMoveArgs);
    };

    const reset = () => {
        setData(undefined);
        setIsloading(true);
        setError(false);
    };

    return {
        handleMove,
        data,
        isLoading,
        error,
        reset
    };
};

export default useFetchOnMove;
