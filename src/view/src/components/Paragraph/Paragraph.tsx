import React, {FC} from "react";

import classNames from './style.module.css';
import {classNamesCombiner} from "../../utils";

interface IParagraph {
    className?: string;
    size: "m" | "s"
    style?: Record<string, string | number | null>;
}

const Paragraph: FC<IParagraph> = ({className, style, size, children}) => {
    const combinedClassName = classNamesCombiner({
        [classNames.paragraph]: true,
        [classNames.medium]: size === "m",
        [classNames.small]: size === "s",
        [className || '']: Boolean(className),
    })
    return (
        <p className={combinedClassName} style={style}>
            {children}
        </p>
    );
};

export default Paragraph;