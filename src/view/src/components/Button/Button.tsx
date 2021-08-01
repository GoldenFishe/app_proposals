import React, {FC, MouseEvent} from 'react';

import classNames from './style.module.css';

interface IButton {
    type?: "button" | "submit";
    fullWidth?: boolean;
    onClick?: (e: MouseEvent) => void;
}

const Button: FC<IButton> = ({
                                 type = "button",
                                 onClick,
                                 fullWidth,
                                 children
                             }) => {
    let className = classNames.button;
    if (fullWidth) className += ` ${classNames.fullWidth}`;
    return (
        <button type={type}
                className={className}
                onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;