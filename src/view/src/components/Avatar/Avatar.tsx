import React, {ChangeEvent, FC} from 'react';

import Icon from "../Icon";
import {classNamesCombiner} from "../../utils";
import classNames from './style.module.css';

interface IAvatar {
    src: string | null;
    size: 's' | 'm',
    onEdit?: (file: FileList) => void;
}

const Avatar: FC<IAvatar> = ({src, size, onEdit}) => {
    const className = classNamesCombiner({
        [classNames.avatar]: true,
        [classNames.medium]: size === "m",
        [classNames.small]: size === "s"
    })
    const handleOnChange = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        const files = input.files as FileList;
        if (onEdit) onEdit(files);
    }
    return (
        <div className={className}>
            {onEdit && (
                <label className={classNames.uploaderOverlay}>
                    <Icon icon="pen" size={20}/>
                    <input type="file"
                           className={classNames.input}
                           onChange={handleOnChange}/>
                </label>
            )}
            {src !== null && <img src={src} alt={src}/>}
        </div>
    );
};

export default Avatar;