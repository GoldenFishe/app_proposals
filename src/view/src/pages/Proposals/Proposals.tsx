import React, {FC, MouseEvent, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {dislikeProposal, getProposals, likeProposal, resetProposals} from "./actions";
import Proposal from "./component/Proposal/Proposal";
import {routes} from "../../constants/routes";
import classNames from './style.module.css';

const Proposals: FC = () => {
    const dispatch = useDispatch();
    const proposals = useSelector((state: RootState) => state.proposals.data);
    useEffect(() => {
        dispatch(getProposals());
        return () => {
            dispatch(resetProposals());
        }
    }, [dispatch]);
    const like = (proposalId: number) => (e: MouseEvent) => {
        e.preventDefault();
        dispatch(likeProposal(proposalId))
    }
    const dislike = (proposalId: number) => {
        return (e: MouseEvent) => {
            e.preventDefault();
            dispatch(dislikeProposal(proposalId))
        }
    }
    return (
        <ul className={classNames.container}>
            {proposals.map(proposal => (
                <li className={classNames.proposalWrapper} key={proposal.id}>
                    <Link to={routes.proposal.getLinkPath(proposal.id)}>
                        <Proposal proposal={proposal}
                                  like={like(proposal.id)}
                                  dislike={dislike(proposal.id)}/>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Proposals;