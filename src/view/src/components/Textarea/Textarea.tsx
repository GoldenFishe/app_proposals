import React, {ChangeEvent, FC} from 'react';

import classNames from './style.module.css';

interface ITextarea {
    label: string;
    value: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    onChange: (value: string) => void;
}

const Textarea: FC<ITextarea> = ({
                                     label,
                                     value,
                                     required,
                                     maxLength,
                                     minLength,
                                     onChange
                                 }) => {
    const handleOnChange = (e: ChangeEvent) => {
        const value = (e.target as HTMLTextAreaElement).value;
        onChange(value);
    }
    return (
        <label className={classNames.wrapper}>
            <span className={classNames.label}>{label}</span>
            <textarea onChange={handleOnChange}
                      className={classNames.textarea}
                      value={value}
                      rows={4}
                      maxLength={maxLength}
                      minLength={minLength}
                      required={required}/>
        </label>
    );
};

export default Textarea;