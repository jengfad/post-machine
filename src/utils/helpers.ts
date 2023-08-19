import { AxiosRequestConfig } from "axios";
import { nanoid } from "nanoid";
import prettyBytes from "pretty-bytes";

const convertKeyValueToObject = (keyPairs) => {
    return [...keyPairs].reduce((data, pair) => {
        const key = pair.keyItem;
        const value = pair.valueItem;

        if (key === '') return data;
        return {
        ...data,
        [key]: value,
        };
    }, {});
};

const getJsonData = (jsonString: string) => {
    let data;
    try {
        data = JSON.parse(jsonString);
        return data;
    } catch (e) {
        alert('Something is wrong with the JSON data.');
    }
}

const getRequestBody = (body: any) => {
    const RANDOM_VALUE_TEXT = '<random_value>';
    const jsonString = body.toString().replace(RANDOM_VALUE_TEXT, nanoid(12));

    let data
    try {
        data = JSON.parse(jsonString);
        return data;
    } catch (e) {
        alert('Something is wrong with the JSON data.');
    }
}

const createAxiosRequest = (data: any, reqMethod: string, url: string, headers: any, queryParams: any) => {
    const request = {
        url: url,
        method: reqMethod,
        params: convertKeyValueToObject(queryParams),
        headers: convertKeyValueToObject(headers)
    } as AxiosRequestConfig;

    if (requestNeedsBody(reqMethod)) {
        request.data = data
    };

    return request;
}

const requestNeedsBody = (reqMethod: string) => {
    return reqMethod === 'PUT' || reqMethod === 'PATCH' || reqMethod === 'POST';
}

const getMeta = (response: any) => {
    const hasResponse = !!response;

    if (!hasResponse) return null;

    let time = '';
    let status = '';
    let size = '';

    if (hasResponse) {
        const hasCustomData = 'customData' in response;
        const hasData = 'data' in response;
        const hasHeaders = 'headers' in response;
    
        status = hasResponse ? response.status : 0;
    
        if (hasData && hasHeaders) {
            size = prettyBytes(
            (hasResponse ? JSON.stringify(response.data).length : 0) +
                (hasResponse ? JSON.stringify(response.headers).length : 0)
            );
        }
    
        if (hasCustomData) {
            time = response.customData.time;
        }

        return {
            time: time,
            status: status,
            size: size
        };
    }
}

export { convertKeyValueToObject, getJsonData, requestNeedsBody, getMeta, getRequestBody, createAxiosRequest };
  