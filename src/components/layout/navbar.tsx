import { observer } from "mobx-react";
import React from 'react';

const Navbar = observer(() => {
    return (
        <div className='absolute w-full border-t-4 border-blue-500 bg-white '>
            <div className='border-b border-gray-300'>
                <div className='flex max-w-6xl mx-auto'>
                    <span className='py-4 px-4 text-2xl font-semibold text-blue-500'>
                    POSTMACHINE
                    </span>
                </div>
            </div>
        </div>
    );
});

export default Navbar;