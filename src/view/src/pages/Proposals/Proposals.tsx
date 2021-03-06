import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Proposal from "./component/Proposal/Proposal";
import {getProposals, resetProposals} from "./actions";
import {RootState} from "../../rootReducer";
import classNames from './style.module.css';

const Proposals: FC = () => {
    const dispatch = useDispatch();
    const proposals = useSelector((state: RootState) => state.proposals.data);
    useEffect(() => {
        dispatch(getProposals());
        return () => {
            dispatch(resetProposals())
        }
    }, []);
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
                                  title={proposal.title}
                                  comments={proposal.comments}
                                  topicId={proposal.topicId}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Proposals;