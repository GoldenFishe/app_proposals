import React, {FC, MouseEvent} from 'react';
import {LikeFilled, LikeOutlined} from '@ant-design/icons';

interface IProps {
    liked: boolean;
    quantity: number;
    like: (event: MouseEvent) => void;
}

const Like: FC<IProps> = ({liked,quantity, like}) => {
    return (
        <span onClick={like}>
            {quantity || null}
            {liked ? <LikeFilled/> : <LikeOutlined/>}
      </span>
    );
};

export default Like;