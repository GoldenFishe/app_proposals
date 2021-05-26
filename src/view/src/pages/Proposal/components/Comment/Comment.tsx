import React, {FC, MouseEventHandler} from 'react';
import {Comment as AntdComment} from "antd";

import {IAuthor} from "../../../../interfaces/IUser";

interface IProps {
    author: IAuthor;
    comment: string;
    createDate: string;
    onLikeComment: MouseEventHandler<HTMLSpanElement>;
    onDislikeComment: MouseEventHandler<HTMLSpanElement>;
    onReplyTo: MouseEventHandler<HTMLSpanElement>;
}

const Comment: FC<IProps> = ({
                                 author,
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
        <AntdComment avatar={author.avatar}
                     author={author.username}
                     content={comment}
                     datetime={createDate}
                     actions={actions}/>
    );
};

export default Comment;