import React, {FC, MouseEvent, CSSProperties} from "react";

import classNames from './style.module.css';
import {classNamesCombiner} from "../../utils";

interface IParagraph {
    className?: string;
    size: "m" | "s";
    onClick?: (e: MouseEvent) => void;
    style?: CSSProperties
}

const Paragraph: FC<IParagraph> = ({
                                       className,
                                       style,
                                       size,
                                       onClick,
                                       children
                                   }) => {
    const combinedClassName = classNamesCombiner({
        [classNames.paragraph]: true,
        [classNames.medium]: size === "m",
        [classNames.small]: size === "s",
        [className || '']: Boolean(className),
    });
    return (
        <p className={combinedClassName} style={style} onClick={onClick}>
            {children}
        </p>
    );
};

export default Paragraph;