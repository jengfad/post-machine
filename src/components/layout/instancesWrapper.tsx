import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../stores/appStore";

const InstancesWrapper = observer(() => {
    const context = useContext(AppContext); 
    const { instances, setInstances } = context;

    const handleOnChange = (e) => {
        setInstances(e.target.value);
    };
    
    return (
        <div className='flex items-center'>
            <label className="pr-3">Instances:</label>
            <input
                className="w-[150px] px-4 py-1.5 border border-gray-300 rounded-md  hover:border-blue-500 focus:outline-blue-500"
                placeholder='No. of requests'
                name='keyItem'
                value={instances}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    );
});

export default InstancesWrapper;