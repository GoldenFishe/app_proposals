import React, {FC, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Typography, Layout, List} from "antd";
import Comment from "./components/Comment/Comment";

import {RootState} from "../../rootReducer";
import {IComment} from "../../interfaces/IComment";
import CreateCommentForm from "./components/CreateCommentForm/CreateCommentForm";
import {
    getProposal,
    leaveComment,
    likeComment as likeCommentAction,
    dislikeComment as dislikeCommentAction
} from "./actions";

const Proposal: FC = () => {
    const {id} = useParams<{ id: string }>();
    const [parentCommentId, setParentCommentId] = useState(null);
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
    const replyTo = useCallback((commentId) => () => setParentCommentId(commentId), []);

    const onSubmitCreateCommentForm = useCallback(({comment}: { comment: string }) => {
        dispatch(leaveComment(comment, Number(id), parentCommentId));
    }, [dispatch, id, parentCommentId]);
    const renderItem = useCallback((comment: IComment) => {
        return (
            <List.Item>
                <Comment author={comment.author}
                         comment={comment.comment}
                         createDate={new Date(comment.createDate).toDateString()}
                         onLikeComment={likeComment(comment.id)}
                         onDislikeComment={dislikeComment(comment.id)}
                         onReplyTo={replyTo(comment.id)}/>
                {comment.id === parentCommentId && <CreateCommentForm onCreate={onSubmitCreateCommentForm}/>}
            </List.Item>
        )
    }, [likeComment, dislikeComment, onSubmitCreateCommentForm, replyTo]);
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