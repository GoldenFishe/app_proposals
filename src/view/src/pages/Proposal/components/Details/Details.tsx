import React, {FC} from 'react';
import {Link} from "react-router-dom";

import Paragraph from "../../../../components/Paragraph";
import Avatar from "../../../../components/Avatar/Avatar";
import {formatDateTime} from "../../../../utils/dateTime";
import {routes} from "../../../../constants/routes";
import {IProposal} from "../../../../types/IProposal";
import classNames from './style.module.css';

interface IDetails {
    proposal: IProposal;
}

const Details: FC<IDetails> = ({proposal}) => {
    const {
        author,
        createDate,
        description
    } = proposal;
    return (
        <div className={classNames.details}>
            <div className={classNames.meta}>
                <Avatar src={author.avatar} size="s"/>
                <Link to={routes.profile.getLinkPath(author.id)}>
                    <Paragraph size="m">{author.username}</Paragraph>
                </Link>
                <Paragraph size="m">{formatDateTime(createDate)}</Paragraph>
            </div>
            <div className={classNames.text}>
                <Paragraph size="m">{description}</Paragraph>
            </div>
            <div className={classNames.actions}/>
        </div>
    );
};

export default Details;