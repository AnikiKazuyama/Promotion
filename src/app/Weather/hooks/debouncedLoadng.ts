import { AnyType } from 'app/common/types';
import { debounce } from 'lodash';
import {
    useEffect, useRef
} from 'react';

const useDebounceLoading = (callback: AnyType, params?: Record<string, unknown> | null) => {
    const debounceFetcher = useRef(debounce(async (geoposition) => {
        if (geoposition) {
            await callback(geoposition);
        }
    }, 250));

    useEffect(() => {
        debounceFetcher.current(params);
    }, [params]);
};

export default useDebounceLoading;
