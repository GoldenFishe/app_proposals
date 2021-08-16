import React, {useState, FC} from 'react';
import {ContentState, convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

import classNames from "../Textarea/style.module.css";

interface ITextareaWithFormatting {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const TextareaWithFormatting: FC<ITextareaWithFormatting> = ({
                                                                 label,
                                                                 value,
                                                                 onChange
                                                             }) => {
    const initialEditorState = ContentState.createFromText(value);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(initialEditorState));
    const handleChange = (editorState: EditorState) => {
        setEditorState(editorState);
        const currentContentState = editorState.getCurrentContent();
        const [block] = convertToRaw(currentContentState).blocks;
        console.log(block);
        let formattedText = '';
        block.inlineStyleRanges.forEach((cur) => {
            const text = block.text;
            const start = cur.offset;
            const end = cur.offset + cur.length;
            formattedText += `${text.slice(0, start)}<p>${text.slice(start, end)}</p>`
        }, )
        console.log(formattedText);
        onChange(editorState.getCurrentContent().getPlainText());
    }
    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            handleChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }
    const _onBoldClick = () => {
        handleChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    }
    const _onCodeClick = () => {
        handleChange(RichUtils.toggleCode(editorState));
    }
    return (
        <label className={classNames.wrapper}>
            <span className={classNames.label}>{label}</span>
            <div onClick={_onBoldClick}>Bold</div>
            <div onClick={_onCodeClick}>Code</div>
            <div className={classNames.textarea}>
                <Editor editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        onChange={handleChange}/>
            </div>
        </label>
    );
};

export default TextareaWithFormatting;