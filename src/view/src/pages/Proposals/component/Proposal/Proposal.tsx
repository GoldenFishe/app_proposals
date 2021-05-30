import React, {FC, useMemo, MouseEvent} from 'react';
import {Card, Typography} from "antd";
import Like from "../../../../components/Like";
import Dislike from "../../../../components/Dislike";

interface IProps {
    title: string;
    description: string;
    liked: boolean;
    likes: number;
    like: (e: MouseEvent) => void;
    disliked: boolean;
    dislikes: number;
    dislike: (e: MouseEvent) => void;
}

const Proposal: FC<IProps> = ({
                                  description,
                                  title,
                                  liked,
                                  likes,
                                  like,
                                  disliked,
                                  dislikes,
                                  dislike
                              }) => {
    const actions = [
        <Like liked={liked} quantity={likes} like={like}/>,
        <Dislike disliked={disliked} quantity={dislikes} dislike={dislike}/>
    ]
    const cardTitle = <Typography.Title level={5} ellipsis={{rows: 2}}>{title}</Typography.Title>;
    const cardDescription = <Typography.Paragraph ellipsis={{rows: 4}} type="secondary">{description}</Typography.Paragraph>;
    return (
        <Card hoverable
              style={{width: 240}}
              actions={actions}
              cover={<img alt="example"
                          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}>
            <Card.Meta title={cardTitle} description={cardDescription}/>
        </Card>
    );
};

export default Proposal;