import { makeAutoObservable } from 'mobx';

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
