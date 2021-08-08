import React, {FC} from 'react';

import {IUser} from "../../../../types/IUser";
import classNames from './style.module.css';
import Paragraph from "../../../../components/Paragraph";
import Avatar from "../../../../components/Avatar/Avatar";

interface IViewProfile {
    viewProfile: IUser
}

const ViewProfile: FC<IViewProfile> = ({viewProfile}) => {
    return (
        <div className={classNames.container}>
            <Avatar src={"https://avatars.mds.yandex.net/get-ott/374297/2a000001616b87458162c9216ccd5144e94d/678x380"} size="m"/>
            <div className={classNames.item}>
                <Paragraph size="m">Username</Paragraph>
                <Paragraph size="m">{viewProfile.username}</Paragraph>
            </div>
        </div>
    );
};

export default ViewProfile;