import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import IProposal from "../../../../interfaces/IProposal";

const Proposal: FC<IProposal> = ({authorId, description, id, rating, title}) => {
    return (
        <Link to={`/proposals/${id}`}>
            <h6>{title}</h6>
            <p>{description}</p>
        </Link>
    );
};

export default Proposal;