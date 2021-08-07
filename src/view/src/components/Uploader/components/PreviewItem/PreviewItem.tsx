import React, {FC} from "react";

import classNames from "./style.module.css";

interface IPreviewItem {
    file: File;
}

const PreviewItem: FC<IPreviewItem> = ({file}) => {
    const objectURL = window.URL.createObjectURL(file);
    return (
        <div className={classNames.previewItem}>
            <img src={objectURL}
                 className={classNames.previewImage}
                 alt={file.name}/>
        </div>
    );
};

export default PreviewItem;