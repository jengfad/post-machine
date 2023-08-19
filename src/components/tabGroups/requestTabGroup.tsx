import { observer } from "mobx-react";
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import KeyValuePanel from "../panels/keyValue/keyValuePanel";
import JsonEditorPanel from "../panels/json/jsonEditorPanel";
import './tab-group.css';

interface IProps {
    queryParams: any;
    setQueryParams: any;
    headers: any;
    setHeaders: any;
    body: any;
    setBody: any;
};

const RequestTabGroup = observer((props: IProps) => {
    const { queryParams, setQueryParams, headers, setHeaders, body, setBody } = props;

    const requestTabs = [
        {
            slug: 'query-params',
            title: 'Query Params',
            panel: KeyValuePanel,
            panelValue: queryParams,
            setPanelValue: setQueryParams,
        },
        {
            slug: 'headers',
            title: 'Headers',
            panel: KeyValuePanel,
            panelValue: headers,
            setPanelValue: setHeaders,
        },
        {
            slug: 'body',
            title: 'Body',
            panel: JsonEditorPanel,
            panelValue: body,
            setPanelValue: setBody,
        },
    ];

    // useEffect(() => {
    //     if (reqMethod === 'PUT' || reqMethod === 'PATCH' || reqMethod === 'POST') {
    //         tabs.push({
    //             slug: 'body',
    //             title: 'Body',
    //             panel: JsonEditorPanel,
    //             panelValue: body,
    //             setPanelValue: setBody,
    //             isEditable: true
    //         });
    //     }
    //     setRequestTabs(tabs);
    // }, [reqMethod]);
    
    return (
        <Tabs forceRenderTabPanel selectedTabClassName="border-b-2 text-blue-600">
            <TabList className="flex mt-5 border border-gray-300 rounded-t-lg">
                {requestTabs.map((tab) => (
                    <Tab className="mr-3 py-2 px-4 border-blue-400 focus:outline-none 
                                    hover:text-blue-500 cursor-pointer" 
                        key={tab.slug}>
                        {tab.title}
                    </Tab>
                ))}
            </TabList>

            {requestTabs.map((tab) => (
                <TabPanel className="react-tabs__tab-panel px-4 py-4 rounded-b-lg border border-t-0 border-gray-300" key={tab.slug}>
                    <tab.panel
                        panelValue={tab.panelValue}
                        setPanelValue={tab.setPanelValue}
                        group={'request'}
                    />
                </TabPanel>
            ))}
        </Tabs>
    );
});

export default RequestTabGroup;