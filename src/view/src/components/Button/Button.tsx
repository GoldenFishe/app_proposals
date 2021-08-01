import React, {FC, MouseEvent} from 'react';

interface IButton {
    type?: "button" | "submit";
    onClick?: (e: MouseEvent) => void;
}

const Button: FC<IButton> = ({type = "button", onClick, children}) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;