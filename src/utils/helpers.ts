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

const convertToCSV = (arr) => {
    const array = [Object.keys(arr[0])].concat(arr)

    return array.map(it => {
        return Object.values(it).toString()
    }).join('\n')
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

export { convertKeyValueToObject, getJsonData, convertToCSV, getMeta };
  