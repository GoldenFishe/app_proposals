import React, {FC, useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Typography, Layout, List, Comment} from "antd";

import {IComment} from "../../interfaces/IComment";
import CreateCommentForm from "./components/CreateCommentForm/CreateCommentForm";
import {
    getProposal,
    leaveComment,
    likeComment as likeCommentAction,
    dislikeComment as dislikeCommentAction
} from "./actions";
import {RootState} from "../../rootReducer";

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
    const likeComment = useCallback((commentId) => () => dispatch(likeCommentAction(commentId)), [dispatch]);
    const dislikeComment = useCallback((commentId) => () => dispatch(dislikeCommentAction(commentId)), [dispatch]);

    const onSubmitCreateCommentForm = useCallback(({comment}: { comment: string }) => {
        dispatch(leaveComment(comment, Number(id)));
    }, [dispatch, id]);
    const renderItem = useCallback((comment: IComment) => {
        const actions = [
            <span onClick={likeComment(comment.id)}>Like</span>,
            <span onClick={dislikeComment(comment.id)}>Dislike</span>,
            <span>Reply to</span>,
        ];
        return (
            <List.Item>
                <Comment author={comment.author.username}
                         content={comment.comment}
                         datetime={new Date(comment.createDate).toDateString()}
                         actions={actions}/>
            </List.Item>
        )
    }, [likeComment, dislikeComment]);
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