import React, {FC, MouseEvent} from "react";

import {IAuthor} from "../../../../types/IUser";
import Like from "../../../../components/Like";
import Dislike from "../../../../components/Dislike";
import Paragraph from "../../../../components/Paragraph";
import classNames from "./style.module.css";

interface IComment {
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

const Comment: FC<IComment> = ({
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
    const dateTimeFormat: Record<string, "numeric"> = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    const createDateTime = new Intl.DateTimeFormat(undefined, dateTimeFormat).format(new Date(createDate));
    return (
        <li className={classNames.comment}>
            <div className={classNames.meta}>
                <Paragraph>{author.username}</Paragraph>
                <Paragraph>{createDateTime}</Paragraph>
            </div>
            <div className={classNames.text}>
                <Paragraph>{comment}</Paragraph>
            </div>
            <div className={classNames.actions}>
                <Like quantity={likes} liked={isLiked} like={onLikeComment}/>
                <Dislike quantity={dislikes} disliked={isDisliked} dislike={onDislikeComment}/>
                <span onClick={onReplyTo}>Reply to</span>
            </div>
        </li>
        // <AntdComment avatar={author.avatar}
        //              author={author.username}
        //              content={comment}
        //              datetime={createDate}
        //              actions={actions}/>
    );
};

export default Comment;