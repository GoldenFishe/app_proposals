import React, {FC, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Typography, Layout, List, Comment} from "antd";

import {IComment} from "../../interfaces/IComment";
import {getProposal, leaveComment, resetProposal} from "./actions";
import {RootState} from "../../rootReducer";
import CreateCommentForm from "./components/CreateCommentForm/CreateCommentForm";

const Proposal: FC = () => {
    const {id} = useParams<{ id: string }>();
    const proposal = useSelector((state: RootState) => state.proposal.data);
    const dispatch = useDispatch();
    useEffect(() => {
        if (proposal === null) dispatch(getProposal(Number(id)));
    }, [id, proposal, dispatch]);
    // useEffect(() => () => {
    //     dispatch(resetProposal())
    // }, []);
    const onSubmitCreateCommentForm = useCallback(({comment}: { comment: string }) => {
        dispatch(leaveComment(comment, Number(id)));
    }, [dispatch, id]);
    const renderItem = useCallback((comment: IComment) => (
        <List.Item>
            <Comment author={<p>Han Solo</p>}
                     content={comment.comment}
                     datetime={<span>{new Date().toDateString()}</span>}/>
        </List.Item>
    ), []);
    return (
        <Layout>
            <Typography.Title level={3}>{proposal?.title}</Typography.Title>
            <Typography.Paragraph>{proposal?.description}</Typography.Paragraph>
            <CreateCommentForm onCreate={onSubmitCreateCommentForm}/>
            <List dataSource={proposal?.comments}
                  renderItem={renderItem}
                  key="id"/>
        </Layout>
    )
};

export default Proposal;