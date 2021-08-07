import React, {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Comment from "./components/Comment/Comment";

import CreateCommentForm from "./components/CreateCommentForm/CreateCommentForm";
import Protected from "../../components/Protected";
import Details from "./components/Details/Details";
import {
    getProposal,
    leaveComment,
    likeComment as likeCommentAction,
    dislikeComment as dislikeCommentAction,
    resetProposal
} from "./actions";
import classNames from "./style.module.css";

const Proposal: FC = () => {
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();
    const [parentCommentId, setParentCommentId] = useState<number | null>(null);
    const proposal = useSelector((state: RootState) => state.proposal.data);
    useEffect(() => {
        dispatch(getProposal(Number(id)));
        return () => {
            dispatch(resetProposal());
        }
    }, [dispatch, id]);
    const likeComment = (commentId: number) => () => dispatch(likeCommentAction(commentId));
    const dislikeComment = (commentId: number) => () => dispatch(dislikeCommentAction(commentId));
    const replyTo = (commentId: number) => () => setParentCommentId(commentId);
    const onSubmitCreateCommentForm = (formData: FormData) => {
        formData.append("proposalId", id);
        if (parentCommentId !== null) formData.append("parentCommentId", parentCommentId.toString());
        dispatch(leaveComment(formData));
    }
    if (!proposal) return <p>...loading</p>;
    return (
        <div className={classNames.container}>
            <Details proposal={proposal}/>
            <ul>
                {proposal.comments.map(comment => (
                    <li key={comment.id} className={classNames.comment}>
                        <Comment comment={comment}
                                 onLikeComment={likeComment(comment.id)}
                                 onDislikeComment={dislikeComment(comment.id)}
                                 onReplyTo={replyTo(comment.id)}/>
                        {comment.id === parentCommentId && <CreateCommentForm onCreate={onSubmitCreateCommentForm}/>}
                    </li>
                ))}
            </ul>
            <Protected>
                <CreateCommentForm onCreate={onSubmitCreateCommentForm}/>
            </Protected>
        </div>
    )
};

export default Proposal;