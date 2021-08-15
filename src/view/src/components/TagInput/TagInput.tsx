import React, {FC, KeyboardEvent, useState} from 'react';

import Paragraph from "../Paragraph";
import Icon from "../Icon";
import classNames from './style.module.css';

interface ITagInput {
    label: string;
    value: string[];
    onChange: (tags: string[]) => void;
}

const TagInput: FC<ITagInput> = ({label, value, onChange}) => {
    const [tag, setTag] = useState('');
    const addTag = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            onChange([...value, tag]);
            setTag('');
        }
    }
    const deleteTag = (index: number) => {
        const cloneTags = [...value];
        cloneTags.splice(index, 1);
        onChange(cloneTags);
    }
    return (
        <label>
            <span>{label}</span>
            <div className={classNames.wrapper} onKeyPress={addTag}>
                {value.map((tag, index) => {
                    return (
                        <div className={classNames.tag} key={tag}>
                            <Paragraph size="m">#{tag}</Paragraph>
                            <Icon icon="cross" size={10}
                                  onClick={() => deleteTag(index)}
                                  className={classNames.deleteTagIcon}/>
                        </div>
                    )
                })}
                <input value={tag}
                       className={classNames.input}
                       onChange={e => setTag(e.target.value)}/>
            </div>
        </label>
    );
};

export default TagInput;