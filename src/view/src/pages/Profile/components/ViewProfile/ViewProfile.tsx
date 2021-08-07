import React, {FC} from 'react';

import {IUser} from "../../../../types/IUser";
import classNames from './style.module.css';

interface IViewProfile {
    viewProfile: IUser
}

const ViewProfile: FC<IViewProfile> = ({viewProfile}) => {
    return (
        <div>
            view profile
        </div>
    );
};

export default ViewProfile;