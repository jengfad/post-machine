import React from 'react';
import { observer } from "mobx-react";
import Navbar from './navbar';

interface IProps {
    children?: any;
}

const Layout = observer((props: IProps) => {
    const { children } = props;
    return (
        <>
            <Navbar />
            <main>
                <div className='flex max-w-6xl min-h-screen pt-[86px] mx-auto px-5 bg-white '>
                    <div className='mx-auto w-full'>{children}</div>
                </div>
            </main>
        </>
    );
});

export default Layout;