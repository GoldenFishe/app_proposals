import React, {FC} from "react";
import {useSelector} from "react-redux";

import Notification from "../Notification/Notification";
import classNames from "./style.module.css";

const Notifications: FC = () => {
    const notifications = useSelector((state: RootState) => state.main.notifications);

    return (
        <div className={classNames.notifications}>
            {notifications.map(notification => <Notification key={notification.id}
                                                             id={notification.id}
                                                             type={notification.type}
                                                             text={notification.text}/>)}
        </div>
    );
};

export default Notifications;