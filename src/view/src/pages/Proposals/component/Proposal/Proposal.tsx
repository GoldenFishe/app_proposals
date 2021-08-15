import React, {FC, MouseEvent} from 'react';

import {IProposalPreview} from "../../../../types/IProposal";
import Like from "../../../../components/Like";
import Dislike from "../../../../components/Dislike";
import Title from "../../../../components/Title";
import Paragraph from "../../../../components/Paragraph";
import Comment from "../Comment/Comment";
import Tag from "../../../../components/Tag/Tag";
import classNames from "./style.module.css";

interface IProposal {
    proposal: IProposalPreview
    like: (e: MouseEvent) => void;
    dislike: (e: MouseEvent) => void;
}

const Proposal: FC<IProposal> = ({proposal, like, dislike}) => {
    const {
        description,
        title,
        isLiked,
        likes,
        isDisliked,
        dislikes,
        commentsQuantity
    } = proposal;
    return (
        <div className={classNames.proposal}>
            <Title level={3}>{title}</Title>
            <Paragraph size="m">{description}</Paragraph>
            <div className={classNames.actions}>
                <Comment quantity={commentsQuantity}/>
                <Like liked={isLiked}
                      quantity={likes}
                      like={like}/>
                <Dislike disliked={isDisliked}
                         quantity={dislikes}
                         dislike={dislike}/>
                <div className={classNames.tags}>{proposal.tags.slice(0, 5).map(tag => <Tag tag={tag} key={tag.tag}/>)}</div>
            </div>
        </div>
    );
};

export default Proposal;