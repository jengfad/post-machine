import { observer } from 'mobx-react';
import React from 'react';
import { RequestMethods } from '../../../constants/requestMethods';

interface IProps {
    url: any;
    setUrl: any;
    reqMethod: any;
    setReqMethod: any;
    onInputSend: any;
}

const UrlEditor = observer((props: IProps) => {
    const { url, setUrl, reqMethod, setReqMethod, onInputSend, } = props;

    return (
        <>
            <form className='flex'>
            <select
                className='px-4 py-2 border rounded-md border-gray-300 hover:border-blue-500 focus:outline-none bg-gray-100'
                value={reqMethod}
                onChange={(e) => setReqMethod(e.target.value)}
            >
                {RequestMethods.map((option) => (
                    <option key={option.slug} value={option.method}>
                        {option.method}
                    </option>
                ))}
            </select>
            <input
                className='ml-3 w-full px-4 py-2 border rounded-md border-gray-300 hover:border-blue-500 focus:outline-blue-500'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                className='ml-3 px-6 py-2 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600'
                type='button'
                onClick={(e) => onInputSend(e)}
            >
                Send
            </button>
            </form>
        </>
    );
});

export default UrlEditor;