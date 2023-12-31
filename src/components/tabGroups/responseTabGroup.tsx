import { observer } from "mobx-react";
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ThreeDots } from 'react-loader-spinner';
import JsonEditorPanel from "../panels/json/jsonEditorPanel";
import { SingleRequest } from "../../constants/requestModes";
import * as XLSX from 'xlsx'

interface IProps {
    response: any;
    loading : any;
    mode: string;
}

const ResponseTabGroup = observer((props: IProps) => {
    const { response, loading, mode } = props; 

    const responseTabs = [
        {
            slug:'response-body',
            title:'Response Body'
        }
    ];

    const doc = JSON.stringify(response, null, 2);

    const renderPanel = () => {
        return (
            <>
                <TabPanel className="max-h-[500px] overflow-y-auto">
                    {renderBulkSummary()}
                    <JsonEditorPanel
                        panelValue={doc}
                        setPanelValue={null}
                        group={'response'}
                    />
                </TabPanel>
            </>
        );
    }

    const renderLoading = () => {
        return (
            <ThreeDots 
                height="30"
                width="30"
                color="gray"
                visible={true} 
            />
        );
    }

    const renderBulkSummary = () => {
        if (mode === SingleRequest || !response) return <></>

        const successCount = response.filter(r => r.status.toString().startsWith('20')).length;
        const failedCount = response.length - successCount;

        return (
            <div className="flex mb-3 content-center">
                <div className="text-green-600">Success: {successCount}</div>
                <div className="text-red-600 ml-3">Failed: {failedCount}</div>
                <div>
                    <button
                        className='ml-3 px-2 rounded-md text-white bg-blue-500 hover:bg-blue-600'
                        type='button'
                        onClick={() => downloadExcel()}>Download response as Excel file</button>
                </div>
            </div>
        );
    }

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(response);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "PostMachineResponses.xlsx");
    }

    return (
        <>
            <Tabs forceRenderTabPanel selectedTabClassName="border-b-2 text-blue-600">
                <TabList className="flex mt-5 border border-gray-300 rounded-t-lg">
                    {responseTabs.map((tab) => (
                        <Tab 
                            className="mr-3 py-2 px-4 border-blue-400 focus:outline-none hover:text-blue-500 cursor-pointer" 
                            key={tab.slug}>
                            {tab.title}
                        </Tab>
                    ))}
                </TabList>
                <div className="px-4 py-4 rounded-b-lg border border-t-0 border-gray-300">
                {loading ? renderLoading() : renderPanel()}
                </div>
            </Tabs>
        </>
    );
});

export default ResponseTabGroup;