import React, {FC} from 'react';

import classNames from './style.module.css';

interface ITitle {
    level: 1 | 2 | 3 | 4 | 5 | 6
}

const Title: FC<ITitle> = ({level, children}) => {
    switch (level) {
        case 1:
            return <h1 className={classNames.h1}>{children}</h1>
        case 2:
            return <h2 className={classNames.h2}>{children}</h2>
        case 3:
            return <h3 className={classNames.h3}>{children}</h3>
        case 4:
            return <h4 className={classNames.h4}>{children}</h4>
        case 5:
            return <h5 className={classNames.h5}>{children}</h5>
        case 6:
            return <h6 className={classNames.h6}>{children}</h6>
        default:
            return null
    }
};

export default Title;