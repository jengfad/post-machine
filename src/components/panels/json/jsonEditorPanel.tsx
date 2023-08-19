import React, { useRef, useEffect, useContext, useState } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { defaultTabBinding } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';
import { observer } from 'mobx-react';
import { AppContext } from '../../../stores/appStore';

const basicExtensions = [
  basicSetup,
  keymap.of([defaultTabBinding]),
  json(),
  EditorState.tabSize.of(2),
];

interface IProps {
  panelValue: any;
  setPanelValue: any;
  group: any;
}

const JsonEditorPanel = observer((props: IProps) => {
  const { panelValue, setPanelValue, group } = props;
  const context = useContext(AppContext);
  const { reqMethod } = context;
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current === null) return;

    let canEditJson = false;
    if (group === 'request') {
      canEditJson = reqMethod === 'PUT' || reqMethod === 'PATCH' || reqMethod === 'POST';
    }

    const state = EditorState.create({
      doc: panelValue,
      extensions: [
        ...basicExtensions,
        EditorView.updateListener.of((view) => {
          if (view.docChanged) {
            setPanelValue(view.state.doc);
          }
        }),
        EditorView.editable.of(canEditJson),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
    // eslint-disable-next-line
  }, [editorRef.current, panelValue, reqMethod]);

  return <div ref={editorRef}></div>;
});

export default JsonEditorPanel;