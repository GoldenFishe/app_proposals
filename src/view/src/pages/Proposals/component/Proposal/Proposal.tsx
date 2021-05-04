import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {Typography} from "antd";

import {IProposal} from "../../../../interfaces/IProposal";

const Proposal: FC<IProposal> = ({authorId, description, id, rating, title}) => {
    return (
        <Link to={`/proposals/${id}`} component={Typography.Link}>
            <Typography.Title level={5}>{title}</Typography.Title>
            <Typography.Paragraph>{description}</Typography.Paragraph>
        </Link>
    );
};

export default Proposal;