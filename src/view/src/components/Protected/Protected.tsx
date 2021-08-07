import {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";

interface IProtected {
    children: ReactElement
}

const Protected: FC<IProtected> = ({children}) => {
    const user = useSelector((state: RootState) => state.profile.userProfile);
    return user !== null ? children : null;
};

export default Protected;