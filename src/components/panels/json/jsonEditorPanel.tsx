import React, { useRef, useEffect } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { defaultTabBinding } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';
import { observer } from 'mobx-react';

const basicExtensions = [
  basicSetup,
  keymap.of([defaultTabBinding]),
  json(),
  EditorState.tabSize.of(2),
];

interface IProps {
  panelValue: any;
  setPanelValue: any;
  isEditable: boolean
}

const JsonEditorPanel = observer((props: IProps) => {
  const { panelValue, setPanelValue, isEditable } = props
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current === null) return;

    const state = EditorState.create({
      doc: panelValue,
      extensions: [
        ...basicExtensions,
        EditorView.updateListener.of((view) => {
          if (view.docChanged) {
            setPanelValue(view.state.doc);
          }
        }),
        EditorView.editable.of(isEditable),
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
  }, [editorRef.current, panelValue]);

  return <div ref={editorRef}></div>;
});

export default JsonEditorPanel;