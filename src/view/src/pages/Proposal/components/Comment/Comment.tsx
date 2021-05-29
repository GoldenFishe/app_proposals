import React, {FC, MouseEvent} from 'react';
import {Comment as AntdComment} from "antd";

import {IAuthor} from "../../../../interfaces/IUser";
import Like from "../../../../components/Like";
import Dislike from "../../../../components/Dislike";

interface IProps {
    author: IAuthor;
    comment: string;
    createDate: string;
    isLiked: boolean;
    isDisliked: boolean;
    likes: number;
    dislikes: number;
    onLikeComment: (e: MouseEvent) => void;
    onDislikeComment: (e: MouseEvent) => void;
    onReplyTo: (e: MouseEvent) => void;
}

const Comment: FC<IProps> = ({
                                 author,
                                 comment,
                                 createDate,
                                 isLiked,
                                 isDisliked,
                                 likes,
                                 dislikes,
                                 onLikeComment,
                                 onDislikeComment,
                                 onReplyTo
                             }) => {
    const actions = [
        <Like quantity={likes} liked={isLiked} like={onLikeComment}/>,
        <Dislike quantity={dislikes} disliked={isDisliked} dislike={onDislikeComment}/>,
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