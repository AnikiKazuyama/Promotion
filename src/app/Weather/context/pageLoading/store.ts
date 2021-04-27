import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

enableStaticRendering(typeof window === 'undefined');
export class PageLoadingStore {
    isLoading = false

    constructor() {
        makeAutoObservable(this);
    }

    setPageLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    }
}

const pageLoadingStore = new PageLoadingStore();

export default pageLoadingStore;
