import { observer } from 'mobx-react';
import React from 'react';
import KeyValueEditor from './keyValueEditor';
import { getRandomId } from '../../../utils/helpers';

interface IProps {
    panelValue: any;
    setPanelValue: any;
    group: any;
}

const KeyValuePanel = observer((props: IProps) => {
    const { panelValue, setPanelValue } = props;
    const onKeyPairAdd = () => {
        setPanelValue((panelValue) => [
            ...panelValue,
            {
                id: getRandomId(),
                keyItem: '',
                valueItem: '',
            },
        ]);
    };

    const onKeyPairRemove = (keyPair) => {
        let newKeyValues = [...panelValue];
        newKeyValues = newKeyValues.filter((x) => x.id !== keyPair.id);
        setPanelValue(newKeyValues);
    };

    const onKeyPairUpdate = (keyPair) => {
        const elementIndex = panelValue.findIndex(
            (element) => element.id === keyPair.id
        );
        let newKeyValues = [...panelValue];
        newKeyValues[elementIndex] = {
            ...newKeyValues[elementIndex],
            keyItem: keyPair.keyItem,
            valueItem: keyPair.valueItem,
        };
        setPanelValue(newKeyValues);
    };

    const renderedList = panelValue.map((keyPair) => {
        return (
            <KeyValueEditor
                key={keyPair.id}
                keyPair={keyPair}
                setKeyPair={(keyPairValue) => onKeyPairUpdate(keyPairValue)}
                onKeyPairRemove={() => onKeyPairRemove(keyPair)}
            />
        );
    });

    return (
        <>
            <div className=''>
                {renderedList}
                <button 
                className="px-6 py-1 rounded-md text-blue-600 border border-blue-400 hover:bg-blue-100"
                onClick={() => onKeyPairAdd()}>Add</button>
            </div>
        </>
    );
});

export default KeyValuePanel;