import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { BulkRequest } from "../constants/requestModes";
import { getRandomId } from "../utils/helpers";

class AppStore {
    constructor() {
        makeAutoObservable(this);
    }

    mode = BulkRequest;
    instances = 1;
    url = 'https://jsonplaceholder.typicode.com/todos/1';
    reqMethod = 'GET';
    bulkResponses = [];
    singleResponse: any;
    loading = false;

    setLoading = (val: boolean) => {
        this.loading = val;
    }

    setSingleResponse = (response: any) => {
        this.singleResponse = response;
    }

    setBulkResponses = (responses: any[]) => {
        const formattedResponses = responses.map(response => {
            return {
                duration: `${response.customData?.time}ms`,  
                status: response.status,
                statusText: response.status.toString().startsWith('20') ? 'SUCCESS' : 'FAILED',
                responseBody: JSON.stringify(response.data),
                requestBody: response.config.data,
            }
        });
        this.bulkResponses = formattedResponses;
    }

    setReqMethod = (method: string) => {
        this.reqMethod = method;
    }

    setMode = (mode: string) => {
        this.mode = mode;
    }

    setInstances = (instances: number) => {
        this.instances = instances;
    }

    setUrl = (url: string) => {
        this.url = url;
    }

}

export const appStore = new AppStore();
export const AppContext = createContext(appStore);