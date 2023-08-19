import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import prettyBytes from 'pretty-bytes';
import ResponseTabGroup from '../tabGroups/responseTabGroup';

interface IProps {
    response: any; 
    loading: any;
}

const ResponseWorkspace = observer((props: IProps) => {
    const { response, loading } = props;
    const [doc, setDoc] = useState('{}');

    useEffect(() => {
        if (response === null) return;
        const jsonResponse = JSON.stringify(response.data, null, 2);
        setDoc(jsonResponse);
    }, [response, loading]);

    const hasResponse = !(response == null);

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
    }

    const RenderedResponseMeta = () => {
        return (
        <div className="flex mt-3">
            <span className='w-28'>Status: {status}</span>
            <span className='w-24'>Time: {time}</span>
            <span className='w-24'>Size: {size}</span>
        </div>
        );
    };

    return (
        <div className='my-4'>
        <span className='text-2xl font-medium'>Response</span>
        {response ? ( <RenderedResponseMeta /> ) : null}
        <ResponseTabGroup
            doc={doc}
            setDoc={setDoc}
            response={response}
            loading={loading}
        />
        </div>
    );
});

export default ResponseWorkspace;