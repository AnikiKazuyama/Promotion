import { Router } from 'next/router';
import { createContext, useContext, useEffect } from 'react';
import pageLoadingStore, { PageLoadingStore } from './store';

const PageLoadingContext = createContext<PageLoadingStore>();

const PageLoadingProvider: React.FC = ({ children }) => {
    useEffect(() => {
        const start = () => {
            pageLoadingStore.setPageLoading(true);
        };
        const end = () => {
            pageLoadingStore.setPageLoading(false);
        };
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);

        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);

    return (
        <PageLoadingContext.Provider value={pageLoadingStore}>
            {children}
        </PageLoadingContext.Provider>
    );
};

const usePageLoading = () => {
    const pageLoadingStoreContext = useContext(PageLoadingContext);

    if (pageLoadingStoreContext === undefined) {
        throw new Error('usePageLoading must be used within a PageLoadingContext');
    }

    return pageLoadingStoreContext;
};

export { PageLoadingProvider, usePageLoading };
