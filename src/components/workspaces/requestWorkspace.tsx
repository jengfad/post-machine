import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import UrlEditor from "../panels/url/urlEditor";
import axios from "axios";
import { convertKeyValueToObject, getJsonData } from "../../utils/helpers";
import RequestTabGroup from "../tabGroups/requestTabGroup";
import RequestMode from "../layout/requestMode";
import InstancesWrapper from "../layout/instancesWrapper";
import { AppContext } from "../../stores/appStore";
import { BulkRequest, SingleRequest } from "../../constants/requestModes";

interface IProps {
    setLoading: any; 
}

const RANDOM_VALUE_TEXT = '<random_value>';

const keyPairInitState = [
    {
        id: uuidv4(),
        keyItem: '',
        valueItem: '',
    },
];

const RequestWorkspace = observer((props: IProps) => {
    const context = useContext(AppContext); 
    const { mode, url, setUrl, reqMethod, setReqMethod, instances, setBulkResponses, setSingleResponse } = context;
    
    const { setLoading } = props;

    const [queryParams, setQueryParams] = useState(keyPairInitState);
    const [headers, setHeaders] = useState(keyPairInitState);
    const [body, setBody] = useState('{\n\t\n}');
    
    const bulkRequest = async (e) => {
        setLoading(true);
        e.preventDefault();
        const requests = [];

        for (let i = 0; i < instances; i++) {
            const requestBody = body.toString().replace(RANDOM_VALUE_TEXT, uuidv4());
            const data = getJsonData(requestBody);
            
            const req = {
                url: url,
                method: reqMethod,
                params: convertKeyValueToObject(queryParams),
                headers: convertKeyValueToObject(headers),
                data,
            };
            const task = axios(req).catch(error => {
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
        const requestBody = body.toString().replace(RANDOM_VALUE_TEXT, uuidv4());
        const data = getJsonData(requestBody);
        try {
            const response = await axios({
                url: url,
                method: reqMethod,
                params: convertKeyValueToObject(queryParams),
                headers: convertKeyValueToObject(headers),
                data,
            });
            setSingleResponse(response);
        } catch (e) {
            console.log(e);
            setSingleResponse(e);
        }

        setLoading(false);
    };
    
    return (
        <>
            <div className="flex pt-2 pb-[40px]">
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