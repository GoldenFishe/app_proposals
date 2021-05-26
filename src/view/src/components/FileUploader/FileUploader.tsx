import React, {FC} from 'react';
import {Upload, UploadProps} from "antd";

interface IProps {
    action: string;
    onUpload: UploadProps["customRequest"]
}

const FileUploader: FC<IProps> = ({action, onUpload}) => {
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            customRequest={onUpload}
            showUploadList={false}
            action={action}>
            +
        </Upload>
    );
};

export default FileUploader;