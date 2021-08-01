import React, {FC} from 'react';

interface IParagraph {
    className?: string;
    style?: Record<string, string | number | null>;
}

const Paragraph: FC<IParagraph> = ({className, style, children}) => {
    return (
        <p className={className} style={style}>
            {children}
        </p>
    );
};

export default Paragraph;