import React, {FC, MouseEvent} from 'react';

import Like from "../../../../components/Like";
import Dislike from "../../../../components/Dislike";
import Title from "../../../../components/Title";
import Paragraph from "../../../../components/Paragraph";
import Comment from "../Comment/Comment";
import classNames from "./style.module.css";

interface IProposal {
    title: string;
    description: string;
    liked: boolean;
    likes: number;
    like: (e: MouseEvent) => void;
    disliked: boolean;
    dislikes: number;
    dislike: (e: MouseEvent) => void;
    commentsQuantity: number;
}

const Proposal: FC<IProposal> = ({
                                     description,
                                     title,
                                     liked,
                                     likes,
                                     like,
                                     disliked,
                                     dislikes,
                                     dislike,
                                     commentsQuantity
                                 }) => {
    return (
        <div className={classNames.proposal}>
            <Title level={3}>{title}</Title>
            <Paragraph>{description}</Paragraph>
            <div className={classNames.actions}>
                <Comment quantity={commentsQuantity}/>
                <Like liked={liked}
                      quantity={likes}
                      like={like}/>
                <Dislike disliked={disliked}
                         quantity={dislikes}
                         dislike={dislike}/>
            </div>
        </div>
    );
};

export default Proposal;