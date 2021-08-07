import React, {FC, ChangeEvent} from "react";

import classNames from './style.module.css';

interface IInput {
    label: string;
    type?: string;
    value: string;
    multiple?: boolean;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    onChange: (value: string) => void;
}

const Input: FC<IInput> = ({
                               label,
                               type = "text",
                               value,
                               multiple,
                               required,
                               minLength,
                               maxLength,
                               onChange
                           }) => {
    const handleOnChange = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;
        onChange(value);
    }
    return (
        <label className={classNames.wrapper}>
            <span className={classNames.label}>{label}</span>
            <input type={type}
                   value={value}
                   multiple={multiple}
                   required={required}
                   minLength={minLength}
                   maxLength={maxLength}
                   className={classNames.input}
                   onChange={handleOnChange}/>
        </label>

    );
};

export default Input;