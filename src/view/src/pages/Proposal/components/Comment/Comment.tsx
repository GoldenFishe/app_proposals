import React, {FC, MouseEventHandler} from 'react';
import {Comment as AntdComment} from "antd";

interface IProps {
    authorUsername: string;
    comment: string;
    createDate: string;
    onLikeComment: MouseEventHandler<HTMLSpanElement>;
    onDislikeComment: MouseEventHandler<HTMLSpanElement>;
    onReplyTo: MouseEventHandler<HTMLSpanElement>;
}

const Comment: FC<IProps> = ({
                                 authorUsername,
                                 comment,
                                 createDate,
                                 onLikeComment,
                                 onDislikeComment,
                                 onReplyTo
                             }) => {
    const actions = [
        <span onClick={onLikeComment}>Like</span>,
        <span onClick={onDislikeComment}>Dislike</span>,
        <span onClick={onReplyTo}>Reply to</span>
    ];
    return (
        <AntdComment author={authorUsername}
                     content={comment}
                     datetime={createDate}
                     actions={actions}/>
    );
};

export default Comment;