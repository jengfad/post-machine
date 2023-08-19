import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { SingleRequest } from "../constants/requestModes";

class AppStore {
    constructor() {
        makeAutoObservable(this);
    }

    mode = SingleRequest;
    instances = 1;
    url = 'https://jsonplaceholder.typicode.com/todos/1';
    reqMethod = 'GET';

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