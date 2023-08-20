import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import UrlEditor from "../panels/url/urlEditor";
import axios from "axios";
import { createAxiosRequest, getRandomId, getRequestBody } from "../../utils/helpers";
import RequestTabGroup from "../tabGroups/requestTabGroup";
import RequestMode from "../layout/requestMode";
import InstancesWrapper from "../layout/instancesWrapper";
import { AppContext } from "../../stores/appStore";
import { BulkRequest, SingleRequest } from "../../constants/requestModes";

const keyPairInitState = [
    {
        id: getRandomId(),
        keyItem: '',
        valueItem: '',
    },
]

const RequestWorkspace = observer(() => {
    const context = useContext(AppContext); 
    const { mode, url, setUrl, reqMethod, setReqMethod, instances, setBulkResponses, setSingleResponse, setLoading } = context;
    
    const [queryParams, setQueryParams] = useState(keyPairInitState);
    const [headers, setHeaders] = useState(keyPairInitState);
    const [body, setBody] = useState('{\n\t\n}');
    
    const bulkRequest = async (e) => {
        setLoading(true);
        e.preventDefault();
        const requests = [];

        for (let i = 0; i < instances; i++) {
            const requestBody = getRequestBody(body);
            const axiosRequest = createAxiosRequest(requestBody, reqMethod, url, headers, queryParams);
            const task = axios(axiosRequest).catch(error => {
                return error;
            });
            requests.push(task);
        }

        const responses = await Promise.all(requests);
        setBulkResponses(responses);
        setLoading(false);
    }

    const handleOnInputSend = async (e) => {
        if (mode === SingleRequest) {
            await singleRequest(e);
        } else {
            await bulkRequest(e);
        }
    }

    const singleRequest = async (e) => {
        setLoading(true);

        e.preventDefault();
        const requestBody = getRequestBody(body);
        const axiosRequest = createAxiosRequest(requestBody, reqMethod, url, headers, queryParams);
        try {
            const response = await axios(axiosRequest);
            setSingleResponse(response);
        } catch (e) {
            console.log(e);
            setSingleResponse(e);
        }

        setLoading(false);
    };
    
    return (
        <>
            <span className='text-2xl font-medium'>Request</span>
            <div className="flex py-[20px]">
                <RequestMode></RequestMode>
                {mode === BulkRequest && <div className="pl-[30px]"><InstancesWrapper /></div>}
            </div>
            <UrlEditor
                url={url}
                setUrl={setUrl}
                reqMethod={reqMethod}
                setReqMethod={setReqMethod}
                onInputSend={handleOnInputSend}
            />
            <RequestTabGroup
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                headers={headers}
                setHeaders={setHeaders}
                body={'{\n\t\n}'}
                setBody={setBody}
            />
        </>
    );
});

export default RequestWorkspace;