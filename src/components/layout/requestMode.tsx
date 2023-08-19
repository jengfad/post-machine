import { observer } from "mobx-react";
import React, { useContext } from 'react';
import { RequestModes } from "../../constants/requestModes";
import { AppContext } from "../../stores/appStore";

interface IProps {

}

const RequestMode = observer((props: IProps) => {
    const context = useContext(AppContext); 
    const { mode, setMode } = context;

    return (
        <div>
            <label className="pr-3">Request Mode: </label>
            <select
                className='px-4 py-2 border rounded-md border-gray-300 hover:border-blue-500 focus:outline-none bg-gray-100'
                value={mode}
                onChange={(e) => setMode(e.target.value)}>
                {RequestModes.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default RequestMode;