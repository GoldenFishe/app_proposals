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
                        <Proposal title={proposal.title}
                                  description={proposal.description}
                                  liked={proposal.isLiked}
                                  likes={proposal.likes}
                                  like={like(proposal.id)}
                                  disliked={proposal.isDisliked}
                                  dislikes={proposal.dislikes}
                                  dislike={dislike(proposal.id)}
                                  commentsQuantity={proposal.commentsQuantity}/>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Proposals;