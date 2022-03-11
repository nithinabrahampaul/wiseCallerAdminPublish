import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import React, { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export const WCEditor = React.forwardRef(({ onChange, value }, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  const onEditorStateChange = (value) => {
    setUpdated(true);
    setEditorState(value);
    return onChange(draftToHtml(convertToRaw(value.getCurrentContent())));
  };

  useEffect(() => {
    if (!updated) {
      if (value) {
        let blocks = htmlToDraft(value);
        let content = ContentState.createFromBlockArray(blocks);
        setEditorState(EditorState.createWithContent(content));
      }
    }
  }, [value, updated]);

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      spellCheck
      onEditorStateChange={onEditorStateChange.bind(this)}
    />
  );
});
