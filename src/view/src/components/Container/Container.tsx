import React, {FC} from "react";

import classNames from "./style.module.css";

const Container: FC = ({children}) => {
    return (
        <div className={classNames.container}>
            {children}
        </div>
    );
};

export default Container;