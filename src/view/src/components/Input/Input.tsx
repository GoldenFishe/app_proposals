import React, {FC, ChangeEvent} from "react";

interface IInput {
    label: string;
    type?: string;
    value: string;
    multiple?: boolean;
    onChange: <T>(value: T extends "file" ? FileList : string) => void;
}

const Input: FC<IInput> = ({
                               label,
                               type = "text",
                               value,
                               multiple,
                               onChange
                           }) => {
    const handleOnChange = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        if (type === "file") {
            onChange<typeof type>(input.files as FileList)
        } else {
            onChange<typeof type>(input.value);
        }
    }
    return (
        <label>
            {label}
            <input type={type}
                   value={value}
                   multiple={multiple}
                   onChange={handleOnChange}/>
        </label>

    );
};

export default Input;