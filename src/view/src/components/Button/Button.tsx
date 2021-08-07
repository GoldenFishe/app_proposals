import React, {FC, MouseEvent} from 'react';

import classNames from './style.module.css';

interface IButton {
    type?: "button" | "submit";
    fullWidth?: boolean;
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    className?: string;
}

const Button: FC<IButton> = ({
                                 type = "button",
                                 onClick,
                                 fullWidth,
                                 disabled,
                                 className,
                                 children
                             }) => {
    let combinedClassName = classNames.button;
    if (fullWidth) combinedClassName += ` ${classNames.fullWidth}`;
    if (className) combinedClassName += ` ${className}`;
    return (
        <button type={type}
                className={combinedClassName}
                disabled={disabled}
                onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;