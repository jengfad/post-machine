import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { SingleRequest } from "../constants/requestModes";

class AppStore {
    constructor() {
        makeAutoObservable(this);
    }

    mode = SingleRequest;
    instances = 1;

    setMode = (mode: string) => {
        this.mode = mode;
    }

    setInstances = (instances: number) => {
        this.instances = instances;
    }

}

export const appStore = new AppStore();
export const AppContext = createContext(appStore);