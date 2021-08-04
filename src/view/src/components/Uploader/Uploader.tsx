import React, {ChangeEvent, FC} from 'react';

import classNames from './style.module.css';
import Icon from "../Icon";

interface IUploader {
    label: string;
    multiple?: boolean;
    onChange: (e: FileList) => void;
}

const Uploader: FC<IUploader> = ({label, multiple, onChange}) => {
    const handleOnChange = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        onChange(input.files as FileList);
    }
    return (
        <div className={classNames.uploader}>
            <span className={classNames.label}>{label}</span>
            <label className={classNames.uploadZone}>
                <input type="file"
                       multiple={multiple}
                       className={classNames.input}
                       onChange={handleOnChange}/>
                <Icon icon="inbox" size={45}/>
            </label>
        </div>
    );
};

export default Uploader;