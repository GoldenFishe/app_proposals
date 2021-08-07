import React, {FC} from 'react';

import classNames from './style.module.css';

interface IAvatar {
    src: string | null;
    size: 's' | 'm'
}

const Avatar: FC<IAvatar> = ({src, size}) => {
    let combinedClassName = classNames.avatar;
    if (size === "m") combinedClassName += ` ${classNames.medium}`;
    if (size === "s") combinedClassName += ` ${classNames.small}`;
    return (
        <div className={combinedClassName}>
            {src !== null && <img src={src} alt={src}/>}
        </div>
    );
};

export default Avatar;