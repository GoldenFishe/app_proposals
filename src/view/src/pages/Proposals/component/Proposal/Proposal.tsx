import React, {FC, useMemo, MouseEvent} from 'react';
import {Card} from "antd";
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
    const actions = useMemo(() => ([
        <Like liked={liked} quantity={likes} like={like}/>,
        <Dislike disliked={disliked} quantity={dislikes} dislike={dislike}/>
    ]), [dislike, disliked, dislikes, like, liked, likes]);
    return (
        <Card hoverable
              style={{width: 240}}
              actions={actions}
              cover={<img alt="example"
                          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}>
            <Card.Meta title={title} description={description}/>
        </Card>
    );
};

export default Proposal;