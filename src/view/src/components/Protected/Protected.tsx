import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../rootReducer";

interface IProps {
    children: ReactElement
}

const Protected: FC<IProps> = ({children, ...rest}) => {
    const user = useSelector((state: RootState) => state.main.user);
    if (user !== null) {
        return children;
    } else {
        return null;
    }
};

export default Protected;