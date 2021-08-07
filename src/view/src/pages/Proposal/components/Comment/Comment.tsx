import React, {FC, MouseEvent} from "react";
import {Link} from "react-router-dom";

import {IComment as ICommentProp} from "../../../../types/IComment";
import Like from "../../../../components/Like";
import Dislike from "../../../../components/Dislike";
import Paragraph from "../../../../components/Paragraph";
import Avatar from "../../../../components/Avatar/Avatar";
import {formatDateTime} from "../../../../utils/dateTime";
import {routes} from "../../../../constants/routes";
import classNames from "./style.module.css";

interface IComment {
    comment: ICommentProp
    onLikeComment: (e: MouseEvent) => void;
    onDislikeComment: (e: MouseEvent) => void;
    onReplyTo: () => void;
}

const Comment: FC<IComment> = ({comment, onLikeComment, onDislikeComment, onReplyTo}) => {
    const {
        author,
        comment: text,
        createDate,
        isLiked,
        isDisliked,
        likes,
        dislikes,
    } = comment;
    return (
        <div className={classNames.comment}>
            <div className={classNames.meta}>
                <Avatar src={author.avatar} size="s"/>
                <Link to={routes.profile.getLinkPath(author.id)}>
                    <Paragraph>{author.username}</Paragraph>
                </Link>
                <Paragraph>{formatDateTime(createDate)}</Paragraph>
            </div>
            <div className={classNames.text}>
                <Paragraph>{text}</Paragraph>
            </div>
            <div className={classNames.actions}>
                <Like quantity={likes} liked={isLiked} like={onLikeComment}/>
                <Dislike quantity={dislikes} disliked={isDisliked} dislike={onDislikeComment}/>
                <span onClick={onReplyTo}>Reply to</span>
            </div>
        </div>
    );
};

export default Comment;