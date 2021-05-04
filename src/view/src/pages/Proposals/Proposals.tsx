import React, {FC, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography, List, Layout} from "antd";

import Proposal from "./component/Proposal/Proposal";
import {getProposals, resetProposals} from "./actions";
import {RootState} from "../../rootReducer";
import {IProposal} from "../../interfaces/IProposal";

const Proposals: FC = () => {
    const dispatch = useDispatch();
    const proposals = useSelector((state: RootState) => state.proposals.data);
    useEffect(() => {
        dispatch(getProposals());
        return () => {
            dispatch(resetProposals())
        }
    }, [dispatch]);
    const renderItem = useCallback((proposal: IProposal) => (
        <List.Item>
            <Proposal authorId={proposal.authorId}
                      description={proposal.description}
                      id={proposal.id}
                      rating={proposal.rating}
                      title={proposal.title}
                      comments={proposal.comments}
                      topicId={proposal.topicId}/>
        </List.Item>
    ), []);
    return (
        <Layout>
            <Typography.Title>Proposals</Typography.Title>
            <List dataSource={proposals}
                  renderItem={renderItem}
                  rowKey="id"
                  bordered/>
        </Layout>
    );
};

export default Proposals;