import React, {FC, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Typography, Layout, List} from "antd";
import Comment from "./components/Comment/Comment";

import {RootState} from "../../rootReducer";
import {IComment} from "../../interfaces/IComment";
import CreateCommentForm from "./components/CreateCommentForm/CreateCommentForm";
import Protected from "../../components/Protected";
import {
    getProposal,
    leaveComment,
    likeComment as likeCommentAction,
    dislikeComment as dislikeCommentAction
} from "./actions";
import classNames from './style.module.css';


const Proposal: FC = () => {
    const {id} = useParams<{ id: string }>();
    const [parentCommentId, setParentCommentId] = useState<IComment["id"] | null>(null);
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

    const onSubmitCreateCommentForm = useCallback(values => {
        const {comment, attachments} = values;
        const formData = new FormData();
        formData.append('commentText', comment);
        formData.append('proposalId', id);
        if (parentCommentId !== null) formData.append('parentCommentId', parentCommentId.toString());
        if (attachments) attachments.fileList.map((file: any) => formData.append('attachments[]', file.originFileObj));
        dispatch(leaveComment(formData));
    }, [dispatch, id, parentCommentId]);
    const renderItem = useCallback((comment: IComment) => {
        return (
            <List.Item>
                <Comment author={comment.author}
                         comment={comment.comment}
                         createDate={new Date(comment.createDate).toDateString()}
                         isLiked={comment.isLiked}
                         isDisliked={comment.isDisliked}
                         likes={comment.likes}
                         dislikes={comment.dislikes}
                         onLikeComment={likeComment(comment.id)}
                         onDislikeComment={dislikeComment(comment.id)}
                         onReplyTo={replyTo(comment.id)}/>
                {comment.id === parentCommentId && <CreateCommentForm onCreate={onSubmitCreateCommentForm}/>}
            </List.Item>
        )
    }, [likeComment, dislikeComment, onSubmitCreateCommentForm, replyTo, parentCommentId]);
    if (!proposal) return <p>...loading</p>;
    return (
        <Layout.Content className={classNames.container}>
            <Typography.Title level={3}>{proposal.title}</Typography.Title>
            <Comment author={proposal.author}
                     comment={proposal.description}
                     createDate={proposal.createDate}
                     isLiked={proposal.isLiked}
                     isDisliked={proposal.isDisliked}
                     likes={proposal.likes}
                     dislikes={proposal.dislikes}
                     onLikeComment={() => {
                     }}
                     onDislikeComment={() => {
                     }}
                     onReplyTo={() => {
                     }}/>
            <List dataSource={proposal?.comments}
                  renderItem={renderItem}
                  key="id"/>
            <Protected>
                <CreateCommentForm onCreate={onSubmitCreateCommentForm}/>
            </Protected>
        </Layout.Content>
    )
};

export default Proposal;