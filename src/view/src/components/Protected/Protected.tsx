import {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";

interface IProtected {
    children: ReactElement
}

const Protected: FC<IProtected> = ({children}) => {
    const user = useSelector((state: RootState) => state.main.user);
    if (user !== null) {
        return children;
    } else {
        return null;
    }
};

export default Protected;