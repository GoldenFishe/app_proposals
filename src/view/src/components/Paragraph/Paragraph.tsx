import React, {FC} from "react";

import classNames from './style.module.css';

interface IParagraph {
    className?: string;
    size: "m" | "s"
    style?: Record<string, string | number | null>;
}

const Paragraph: FC<IParagraph> = ({className, style, size, children}) => {
    let combinedClassName = classNames.paragraph;
    if (size === "m") combinedClassName += ` ${classNames.medium}`;
    if (size === "s") combinedClassName += ` ${classNames.small}`;
    if (className) combinedClassName += ` ${className}`;
    return (
        <p className={combinedClassName} style={style}>
            {children}
        </p>
    );
};

export default Paragraph;