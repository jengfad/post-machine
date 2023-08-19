import React, { useState, useEffect, useContext } from 'react';
import { observer } from "mobx-react";
import ResponseTabGroup from '../tabGroups/responseTabGroup';
import { AppContext } from '../../stores/appStore';
import { SingleRequest } from '../../constants/requestModes';
import { getMeta } from '../../utils/helpers';

interface IProps {
    loading: any;
}

interface IMeta {
    time: string;
    status: string;
    size: string;
}

const ResponseWorkspace = observer((props: IProps) => {
    const { loading } = props;
    const context = useContext(AppContext); 
    const { singleResponse, bulkResponses, mode } = context;
    const [meta, setMeta] = useState(undefined);
    const [response, setResponse] = useState(undefined);

    useEffect(() => {
        if (mode === SingleRequest) {
            if (!singleResponse) return;
            setResponse(singleResponse.data);
            assignMeta(singleResponse);
        } else {
            setResponse(bulkResponses);
            assignMeta(null);
        }
    }, [singleResponse, bulkResponses]);

    const assignMeta = (response: any) => {
        if (!response) return setMeta(undefined);

        const meta = getMeta(response);
        setMeta(meta);
    }

    const renderedSingleResponseMeta = (meta: IMeta) => {
        if (!meta) return <></>;
        const { status, time, size } = meta;
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
            {renderedSingleResponseMeta(meta)}
            <ResponseTabGroup
                mode={mode}
                response={response}
                loading={loading}
            />
        </div>
    );
});

export default ResponseWorkspace;