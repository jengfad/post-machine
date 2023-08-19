import { observer } from "mobx-react";
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ThreeDots } from 'react-loader-spinner';
import JsonEditorPanel from "../panels/json/jsonEditorPanel";
import ResponseHeaderPanel from "../panels/responseHeader/responseHeaderPanel";

interface IProps {
    doc: any; 
    setDoc: any; 
    response: any; 
    loading : any; 
}

const ResponseTabGroup = observer((props: IProps) => {
    const { doc, setDoc, response, loading } = props; 

    const responseTabs = [
        {
            slug:'response-body',
            title:'Response Body'
        },
        {
            slug: 'response-header',
            title: 'Response Header'
        }
    ];

    const renderPanel = () => {
        return (
            <>
                <TabPanel>
                    <JsonEditorPanel
                        panelValue={doc}
                        setPanelValue={setDoc}
                        isEditable={false}
                    />
                </TabPanel>
                <TabPanel >
                    <ResponseHeaderPanel response={response} />
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