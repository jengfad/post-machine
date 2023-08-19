import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { BulkRequest } from "../constants/requestModes";

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

    setSingleResponse = (response: any) => {
        this.singleResponse = response;
    }

    setBulkResponses = (responses: any[]) => {
        const formattedResponses = responses.map(response => {
            return {
                data: JSON.stringify(response.data),
                status: response.status,
                requestBody: response.config.data
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