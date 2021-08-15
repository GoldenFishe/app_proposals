import React, {ChangeEvent, FC, useState, ReactElement} from "react";

import Icon from "../Icon";
import PreviewItem from "./components/PreviewItem/PreviewItem";
import classNames from "./style.module.css";

interface IUploader {
    label: string;
    multiple?: boolean;
    onChange: (e: FileList) => void;
}

const Uploader: FC<IUploader> = ({label, multiple, onChange}) => {
    const [previewFiles, setPreviewFiles] = useState<FileList>();
    const handleOnChange = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        const files = input.files as FileList;
        setPreviewFiles(files);
        onChange(files);
    }
    const renderPreview = () => {
        const imgs: Array<ReactElement> = [];
        if (previewFiles !== undefined) {
            for (let i = 0; i < previewFiles.length; i++) {
                const file = previewFiles[i];
                const img = <PreviewItem file={file} key={file.name}/>
                imgs.push(img);
            }
        }
        return imgs;
    }
    const previewItems = renderPreview();
    return (
        <div className={classNames.uploader}>
            <span className={classNames.label}>{label}</span>
            <label className={classNames.uploadZone}>
                <input type="file"
                       multiple={multiple}
                       className={classNames.input}
                       onChange={handleOnChange}/>
                <Icon icon="inbox" size={30}/>
            </label>
            {previewItems.length !== 0 && (
                <div className={classNames.preview}>
                    {previewItems}
                </div>
            )}
        </div>
    );
};

export default Uploader;