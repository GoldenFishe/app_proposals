import React, {FC, MouseEvent} from 'react';
import {Link} from "react-router-dom";

import Paragraph from "../../../../components/Paragraph";
import Like from "../../../../components/Like";
import Dislike from "../../../../components/Dislike";
import {IAuthor} from "../../../../types/IUser";
import {formatDateTime} from "../../../../utils/dateTime";
import classNames from './style.module.css';
import {routes} from "../../../../routes";

interface IDetails {
    author: IAuthor;
    comment: string;
    createDate: string;
    isLiked: boolean;
    isDisliked: boolean;
    likes: number;
    dislikes: number;
    onLikeComment: (e: MouseEvent) => void;
    onDislikeComment: (e: MouseEvent) => void;
}

const Details: FC<IDetails> = ({
                                   author,
                                   comment,
                                   createDate,
                                   isLiked,
                                   isDisliked,
                                   likes,
                                   dislikes,
                                   onLikeComment,
                                   onDislikeComment
                               }) => {
    return (
        <div className={classNames.details}>
            <div className={classNames.meta}>
                <Link to={routes.profile.getLinkPath(author.id)}>
                    <Paragraph>{author.username}</Paragraph>
                </Link>
                <Paragraph>{formatDateTime(createDate)}</Paragraph>
            </div>
            <div className={classNames.text}>
                <Paragraph>{comment}</Paragraph>
            </div>
            <div className={classNames.actions}>
                <Like quantity={likes} liked={isLiked} like={onLikeComment}/>
                <Dislike quantity={dislikes} disliked={isDisliked} dislike={onDislikeComment}/>
            </div>
        </div>
    );
};

export default Details;