import React, {FC} from 'react';

import {useFetch} from "../../hooks";
import IProposal from "../../interfaces/IProposal";
import Proposal from "./component/Proposal/Proposal";
import classNames from './style.module.css';

const Proposals: FC = () => {
    const proposals: Array<IProposal> = useFetch('/api/proposals') || [];
    return (
        <div className={classNames.container}>
            <h1>Proposals</h1>
            <ul className={classNames.list}>
                {proposals.map(proposal => (
                    <li key={proposal.id} className={classNames.listItem}>
                        <Proposal authorId={proposal.authorId}
                                  description={proposal.description}
                                  id={proposal.id}
                                  rating={proposal.rating}
                                  title={proposal.title}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Proposals;