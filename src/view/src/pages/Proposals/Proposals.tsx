import React, {FC, MouseEvent, useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Col, Layout, Row, Typography} from "antd";

import {dislikeProposal, getProposals, likeProposal, resetProposals} from "./actions";
import {RootState} from "../../rootReducer";
import Proposal from "./component/Proposal/Proposal";

const Proposals: FC = () => {
    const dispatch = useDispatch();
    const proposals = useSelector((state: RootState) => state.proposals.data);
    useEffect(() => {
        dispatch(getProposals());
        return () => {
            dispatch(resetProposals())
        }
    }, [dispatch]);
    const like = useCallback((proposalId) => {
        return (e: MouseEvent) => {
            e.preventDefault();
            dispatch(likeProposal(proposalId))
        }
    }, [dispatch]);
    const dislike = useCallback((proposalId) => {
        return (e: MouseEvent) => {
            e.preventDefault();
            dispatch(dislikeProposal(proposalId))
        }
    }, [dispatch]);
    return (
        <Layout>
            <Typography.Title>Proposals</Typography.Title>
            <Layout.Content>
                <Row gutter={[16, 16]}>
                    {proposals.map(proposal => {
                        return (
                            <Col key={proposal.id}>
                                <Link to={`/proposals/${proposal.id}`}>
                                    <Proposal title={proposal.title}
                                              description={proposal.description}
                                              liked={proposal.isLiked}
                                              likes={proposal.likes}
                                              like={like(proposal.id)}
                                              disliked={proposal.isDisliked}
                                              dislikes={proposal.dislikes}
                                              dislike={dislike(proposal.id)}/>
                                </Link>
                            </Col>)
                    })}
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Proposals;